import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { grpcServerOptions } from './grpc.options';
import { request } from 'http';
import { SchemaValidationPipe } from './app/pipes';
import { LoggerService } from './app';
import { GlobalExceptionFilter } from './app/filters';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.NODE_ENV)
  // 必填 全局验证
  app.useGlobalPipes(new SchemaValidationPipe())
  initGlobalFilters(app)
  // swagger接口
  swagger(app)
  console.log(app.getHttpServer())
  await app.listen(3000);
}
bootstrap();


/**
 * 异常过滤器
 * @param app 
 */
export function initGlobalFilters(app: any){
  const logger = new LoggerService( { prettyPrint: {translateTime: true} } )
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
}

/**
 * 配置swagger
 * @param app 
 */
function swagger (app: INestApplication) {
  const options = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
}

// grpc配置服务
function grpc (app: INestApplication) {
  // 开启grpc 作为grpc服务
  app.connectMicroservice(grpcServerOptions);
  app.startAllMicroservicesAsync()
}