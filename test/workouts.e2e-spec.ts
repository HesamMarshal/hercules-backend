import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkoutsModule } from '../src/modules/workouts/workouts.module';
import { PlanModule } from '../src/modules/plan/plan.module';
import { WorkoutEntity } from '../src/modules/workouts/entities/workout.entity';
import { PlanEntity } from '../src/modules/plan/entities/plan.entity';

describe('Workouts (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          synchronize: true,
          entities: [WorkoutEntity, PlanEntity],
        }),
        PlanModule,
        WorkoutsModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    // Bypass auth for testing
    app.useGlobalGuards({ canActivate: () => true } as any);

    await app.init();
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  it('/workouts (POST) should create a workout linked to plan', async () => {
    // First create a Plan
    const plan = await request(app.getHttpServer())
      .post('/plans')
      .send({ name: 'My Test Plan', description: 'test desc' })
      .expect(201);

    const workout = await request(app.getHttpServer())
      .post('/workouts')
      .send({
        planId: plan.body.id,
        name: 'Leg Day',
        order: 1,
        day_of_week: 'MONDAY',
      })
      .expect(201);

    expect(workout.body).toHaveProperty('id');
    expect(workout.body.plan.id).toBe(plan.body.id);
  });
});
