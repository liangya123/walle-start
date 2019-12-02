import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { SendService } from './sends.service';

@Module({
  controllers: [],
  providers: [StorageService, SendService],
  exports: [StorageService, SendService]
})
export class StorageModule {}
