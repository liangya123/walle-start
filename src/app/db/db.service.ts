import { Injectable, Inject } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigDiToken, Config } from '../config';

@Injectable()
export class DbService implements TypeOrmOptionsFactory {

  public constructor(@Inject(ConfigDiToken.CONFIG) private readonly config: Config){}

  createTypeOrmOptions (): TypeOrmModuleOptions {
    return this.config.db
  }

}
