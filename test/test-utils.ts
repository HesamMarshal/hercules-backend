import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/modules/app/app.module';
import { DataSource } from 'typeorm';

export class TestUtils {
  static async getTestingModule() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    return moduleFixture;
  }

  static async createApp(): Promise<INestApplication> {
    const moduleFixture = await this.getTestingModule();
    const app = moduleFixture.createNestApplication();
    await app.init();
    return app;
  }

  static async closeApp(app: INestApplication) {
    const dataSource = app.get(DataSource);
    await dataSource.destroy();
    await app.close();
  }

  static getAuthToken(app: INestApplication, userData: any): Promise<string> {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(userData)
      .then((response) => response.body.access_token);
  }
}
