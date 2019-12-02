import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbService
    }),
  ],
  providers: [],
  exports: []
})
export class DbModule {
  public constructor() {}
}
