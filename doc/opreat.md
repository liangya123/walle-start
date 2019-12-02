1. 创建nest项目
` nest new server `
2. 创建子项目
`nest g app name`
3. 启动
`nest start -w admin`

4. 创建一个db库, 所有项目共用模块
`nest g lib db`

5. 安装typegoose
`yarn add nestjs-typegoose @typegoose/typegoose`

 依赖mongos
 `yarn add mongoose @types/mongoose`

6. crud
`yarn add nestjs-mongoose-crud`

7. 
`yarn add @nestjs/swagger swagger-ui-express`

8.
` ......`


### grpc

#### 服务端

1. 文件cats.proto, 与client一致

```sh
syntax = "proto3";

package demo3; # 包名

service CatsService {
  rpc FindOne (ById) returns (Cat) {} # 暴露方法
}

# message定义结构
message ById { # 参数
  int32 id = 1;
}

message Cat { # 返回类型
  int32 id = 1;
  string name = 2;
}
```

2. 创建文件 grpc.option.ts, 引用.proto文件
```sh
import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
export const grpcServerOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:3000', // grpc连接ip与端口
    package: 'demo3',   // 包名 与.proto中保持一致
    protoPath: join(__dirname, '../cats.proto')
  },
};

```

3. main.ts中加入
```sh
 # 开启grpc 作为grpc服务
  app.connectMicroservice(grpcServerOptions);
  app.startAllMicroservicesAsync()
```

4. 在相应的controller中暴露方法

```sh
import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  # @GrpcMethod('CatsService', 'FindOne') 
  # GrpcMethod中第一个是.proto中服务, 第二个参数是暴露方法名, 不写的话默认是方法的首字母大写
  @GrpcMethod('CatsService', 'FindOne')
  findOne (data: {id: number}, metdata: any) {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(
      ({ id }) => id === data.id
    );
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}

```

#### client端

1. 同服务端一致的.proto文件

2. 创建文件grpc.client.server.ts
```sh
import { Injectable } from "@nestjs/common";
import { ClientGrpc, Client } from "@nestjs/microservices";

import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
// 与服务端的options中配置一致
export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '127.0.0.1:3002',
    package: 'demo3',
    protoPath: join(__dirname, '/proto/cats.proto'),
  },
};


@Injectable()
export class ClentServe {
  @Client(grpcClientOptions) public readonly client: ClientGrpc; 
}
 
```

3. 在使用grpc中集成
```sh

import { Controller, Get, Post, Body, Inject, OnModuleInit } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateCatsDto } from './dto/cat.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { ClentServe } from 'src/grpc-client/client.serve';
import { CatsService } from 'src/grpc-client/interface/api.interface';

@Controller('cats')
export class CatsController implements OnModuleInit {
private catService: CatsService
  constructor(@Inject(ClentServe) private readonly clentServe: ClentServe)  {}
  
  onModuleInit() {
    this.catService = this.clentServe.client.getService<CatsService>('CatsService')
  }

  @Get()
  index() {
    return this.catService.findOne({id: 2})
  }

  @Post()
  createPosts (@Body() dto: CreateCatsDto) {
    return dto
  }

}



```




```
1. 招聘两名业务经理
2. 大专以上学历
3. 土木工程相关专业
4. 3年以上现场施工技术管理经营。
5. 五官端正, 善于表达, 工资面议

岗位职责：
1、负责公司软件产品在地铁、桥梁、隧道等领域的销售；
2、销售计划的制定与执行，并完成按时回款；
3、完成公司的任务目标；
4、及时反馈市场信息，按照需求调整销售策略。
任职要求：
1、大专以上学历, 土木工程相关专业；
2、3年以上建筑、地铁、桥梁等相关行业的现场经验；
3、诚实可靠，做人做事善始善终；
4、出色的市场分析洞察能力、具备全面深刻营销知识和技能；
5、具备一定的管理领导能力和沟通协调能力；
6、能适应出差工作；
7、在相关领域有良好的人脉关系优先。
薪资5-10k，薪资不是最后薪资，都有项目提成
```