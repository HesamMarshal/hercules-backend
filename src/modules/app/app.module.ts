import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TypeOrmConfig } from 'src/config/typeorm.config';
import { CategoryModule } from '../category/category.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { PlanModule } from '../plan/plan.module';
import { SeedModule } from '../seed/seed.module';
import { TrainerModule } from '../trainer/trainer.module';
import { AdminModule } from '../admin/admin.module';
import { WorkoutsModule } from '../workouts/workouts.module';
import { ExerciseModule } from '../exercise/exercise.module';
import { PracticeModule } from '../practice/practice.module';
import dataSource from 'src/database/data-source';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(TypeOrmConfig()),
    TypeOrmModule.forRoot({ ...dataSource.options }),
    // SeedModule,
    AuthModule,
    UserModule,
    PlanModule,
    WorkoutsModule,
    PracticeModule,
    SessionModule,
    ExerciseModule,

    // trainer area
    // TrainerModule,

    // admin area
    // AdminModule,
    // CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
