import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, DbModule, RedisClientModule, LoggerModule } from './app';
import { CatModule } from './cats/cat.module';
import { UsersModule } from './users/users.module';
import { RequestMiddleware } from './app/middlewares';
import { UuserController } from './uuser/uuser.controller';
import { UuserService } from './uuser/uuser.service';

@Module({
  imports: [
    ConfigModule,
    DbModule,
    RedisClientModule,
    LoggerModule,
    CatModule,
    UsersModule
  ],
  controllers: [UuserController],
  providers: [UuserService],
})
export class AppModule implements NestModule {
  // 消费中间件 请求记录
  configure (consumer: MiddlewareConsumer) {
    consumer
    .apply(RequestMiddleware)
    .forRoutes({path: '*', method: RequestMethod.ALL})
  }
}
 