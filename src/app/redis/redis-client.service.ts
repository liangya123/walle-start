import { Injectable, Inject, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as Redis from 'redis';
import { Config, ConfigDiToken } from '../config';

@Injectable()
export class RedisClientService implements OnModuleDestroy {
  private redisClient: Redis.RedisClient;

  public constructor(@Inject(ConfigDiToken.CONFIG) readonly config: Config) {
    this.redisClient = Redis.createClient(this.config.redis);
  }

  onModuleDestroy() {
    if (this.redisClient) {
      this.redisClient.end(true)
    }
  }

  public getClient() {
    return this.redisClient;
  }

  public async hgetall(key: string, parseCb: (reply: any) => void = null): Promise<any> {
    if (typeof key !== 'string') {
      return null
    }
    return await new Promise<any>((complete, fail) => {
      this.redisClient.hgetall(key, (err, reply) => {
        if (err) {
          console.log(err);
          fail(err)
        } else {
          if (!!reply && parseCb) {
            parseCb(reply);
          }
          complete(reply as any)
        }
      })
    })
  }

}