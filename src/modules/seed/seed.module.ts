// src/modules/seed/seed.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserEntity } from '../user/entities/user.entity';
import { PlanEntity } from '../plan/entities/plan.entity';
import { WorkoutEntity } from '../workouts/entities/workout.entity';
import { ExerciseEntity } from '../exercise/entities/exercise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PlanEntity,
      WorkoutEntity,
      ExerciseEntity,
    ]),
  ],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
