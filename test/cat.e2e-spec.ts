import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CatModule } from '../src/cats/cat.module';
import { CatService } from '../src/cats/cat.service';
import { AppModule } from '../src/app.module';
import { GlobalExceptionFilter } from '../src/app/filters';
import { LoggerService } from '../src/app';

describe('Cats', () => {
  let app: INestApplication;
  let server

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, CatModule],
    }).compile();

    app = module.createNestApplication();

    // app.useGlobalFilters(new GlobalExceptionFilter(new LoggerService( { prettyPrint: {translateTime: true} } )));
    // server = app.getHttpServer()
    console.log(app.getHttpServer())
    await app.init();
  });

  it(`/GET cats`, () => {
    // request(app.getHttpServer())
    //   .get('/cats')
    //   .expect(200)
    //   .expect({
    //     data: catsService.findAll(),
    //   });

    console.log(app.getHttpServer())
      // return request(app.getHttpServer())
      // .get('/cats')
      // .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});