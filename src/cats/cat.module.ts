import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { ClentServe } from 'src/grpc-client/client.serve';
import { Cat } from './cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService, LoggerModule } from '../app';
@Module({
  imports: [
    TypeOrmModule.forFeature([Cat]),
    LoggerModule
  ],
  controllers: [CatController],
  providers: [CatService]
})
export class CatModule {}
