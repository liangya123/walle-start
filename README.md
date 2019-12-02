## 说明

### 代码组织结构

```sh
| -- doc  一些操作文档与说明文档
| -- src
      | -- app  全局配置
          | -- config  启动连接配置
          | -- db  pg数据库配置及数据表
          | -- exceptions  做了一个验证校验,继承了BadRequestException
          | -- filters 异常过滤器
          | -- logger  日志打印
          | -- middlewares 中间件 -- 目前没用到
          | -- pipes  前端传入后端的数据为空校验
          | -- redis  redis配置
          | -- storage  oss连接-- TODO
      | -- grpc--client  连接grpc服务配置
          | -- interface  服务器暴露接口
          | -- proto  proto文件, 需要与提供grpc的proto文件保持一致
          | -- client.server.ts  grpc客户端连接
          | -- grpc.client.options.ts  grpc客户端连接服务配置
      | -- utility  公共编程代码 如: 生成随机数等
      | -- cats  业务模块cats
          | -- dto  前---->后端数据规范
          | -- interface  后 ----> 前 数据规范
          | -- cat.controller.ts  路由控制
          | -- cat.entity.ts  数据结构, 生成数据库表
          | -- cat.module.ts
          | -- cat.service.ts 
      | -- ...
      | -- app.module.ts 
      | -- grpc.options.ts 作为grpc服务配置
      | -- main.ts
```

### 开发

- 安装
  
  ```bash
  npm install
  ```

- 准备数据

  ```bash
  #
  $ cd pms-starter/script
  $ ./run sample
  ```

- 启动

  ```bash
  # product
  npm run start
  
  # development
  npm run dev
  ```

  目前配置中，dev启动会使用localhost的数据库，start启动会使用docker中的数据库

- swagger使用  

  npm run dev
  浏览器上访问：/api-doc

### 测试

  ```bash
  # unit tests
  npm run test [spec文件名]
  
  # e2e tests
  npm run test:e2e [e2e-spec文件名]
  
  # test coverage
  npm run test:cov
  ```
  
  unit测试时，注意将`import { Test, TestingModule } from '@nestjs/testing';`放在第一行。
  测试时需要引入DbModule，而DbModule依赖CongfigModule中的配置来创建数据库连接.所以这两个Module都需要引入。

