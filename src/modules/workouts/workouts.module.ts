import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutEntity } from './entities/workout.entity';
import { AuthModule } from '../auth/auth.module';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [AuthModule, PlanModule, TypeOrmModule.forFeature([WorkoutEntity])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule {}
