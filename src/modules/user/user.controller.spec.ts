import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../../common/enum/role.enum';
import { testDatabaseConfig } from 'test/test-database.config';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const mockAuthGuard = {
    canActivate: () => true,
  };

  it('just a test', () => {
    // TODO:remove it
    expect(2).toEqual(2);
  });

  // beforeAll(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [TypeOrmModule.forRoot(testDatabaseConfig), UserModule],
  //   })
  //     .overrideGuard(AuthGuard)
  //     .useValue(mockAuthGuard)
  //     .compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  // afterAll(async () => {
  //   await app.close();
  // });

  // describe('GET /user', () => {
  //   it('should return 200 and array of users', () => {
  //     return request(app.getHttpServer())
  //       .get('/user')
  //       .expect(200)
  //       .expect((response) => {
  //         expect(Array.isArray(response.body)).toBe(true);
  //       });
  //   });
  // });

  // describe('GET /user/my', () => {
  //   it('should return user profile', () => {
  //     return request(app.getHttpServer()).get('/user/my').expect(200);
  //   });
  // });
});
