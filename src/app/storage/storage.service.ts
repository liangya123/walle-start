import * as Path from "path"
import * as Fs from "fs"
import * as Util from 'util';
import { Injectable, Inject } from '@nestjs/common';

let OSS = require("ali-oss")
import { Config,ConfigDiToken } from  '../config';

@Injectable()
export class StorageService {
  constructor(
    @Inject(ConfigDiToken.CONFIG) readonly config:Config
  ) { }
  private client = new  OSS (this.config.storage)

  /**
   * 上传的文件被设置为可读文件, 存在一定风险, 一般用于用户头像等频繁查看无操作的文件
   * @param url 上传到阿里云的具体路径及名字
   * @param path 本地文件位置
   */
  async putReadable(url: string, path: string) {
    // let fileUrl = Path.join(this.config.storage.prefix, url)
    let result = await this.client.put(url, path)
    await this.client.putACL(url, "public-read")
    return result.url
  }

    /**
   * 上传文件  -- 被设置为可读文件
   * @param localPath 
   * @param ossPath 
   * @param size 
   * @param readable 是否公共可读
   */
  public async uploadFile(localPath: string, ossPath: string, size: number, readable: boolean): Promise<boolean> {
    let bRet = Fs.existsSync(localPath)
    let result = false
    if (!bRet) {
        console.log(Util.format('upload failed:%s not exist', localPath))
        return result
    }
    if (size > 2 * 1024 * 1024) {     // 设置MB
        result = await this.resumeUpload(ossPath, localPath)
    } else {
        result = await this.upload(ossPath, localPath)
    }
    if (readable) {
      await this.client.putACL(ossPath, "public-read")  
    }
    return result
  }

  // oss put上传文件
  private async upload(ossPath: string, localPath: string): Promise<boolean> {
    let result = false
    try {
      await this.client.put(ossPath, localPath)
      result = true
    } catch (error) {
      console.log(error)
    }
    return result
  }

  // oss 断点上传
  private async resumeUpload(ossPath: string, localPath: string) {
      let checkpoint: any = 0
      let result = false
      for (let i = 0; i < 3; i++) {
          try {
              let resu = await this.client.multipartUpload(ossPath, localPath, {
                  checkpoint,
                  async progress(percent: number, cpt: any) {
                      checkpoint = cpt
                  }
              })
              result = true
              break
          } catch (error) {
              console.log(error)
          }
      }
      return result
  }

    /**
   * 获取文件的url
   * @param filePath 
   */
  public async getFileSignatureUrl(filePath: string): Promise<string> {
    if (filePath == null) {
        console.log("get file signature failed: file name can not be empty");
        return null
    }

    let result = ""
    try {
        result = this.client.signatureUrl(filePath, { expires: 3600  /**过期时间 */}) 
    } catch (err) {
        console.log(err)
    }
    
    return result
  }

  /**
   *  删除一个文件
   */
  public async deleteOne(filepath: string) {
    if(filepath==null){
        return;
    }
    try {
        let result = this.client.delete(filepath);
    } catch (e) {
        console.log(e);
    }
  }

  /**
   * 删除多个文件
   * @param filepathArr 
   */
  public async deleteMulti(filepathArr: string[]): Promise<void> {
    console.log(filepathArr)
      try {
          let result = await this.client.deleteMulti(filepathArr, { quiet: true });
          // console.log(result);
      } catch (e) {
          console.log('~~', e, '~~');
      }
  }
}
