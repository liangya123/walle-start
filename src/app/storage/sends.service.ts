import { BadRequestException } from "@nestjs/common";

const Core = require('@alicloud/pop-core');

export class SendService {

  private client = new Core({
    accessKeyId: 'LTAI4Ff7XbtxxgQZTwp9ebs1',
    accessKeySecret: 'BiKq9Vt3jCtyvf7UwRLpBGKVMQdALS',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
  });
 
  
  async sends (phone: string, code: number) {
    let params = {
      "RegionId": "cn-hangzhou",
      "SignName": "山东多邦汇德",
      "TemplateCode": "SMS_174991250",
      "PhoneNumbers": phone,
      "TemplateParam": `{"code": "${code}"}`
    }
    await this.client.request('SendSms', params, {method: 'POST'}).then((result) => {
      console.log(JSON.stringify(result));
    }, (ex) => {
      console.log(ex);
      throw new BadRequestException("验证码发送失败")
    })
  }
}
