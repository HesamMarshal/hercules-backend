import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutEntity } from './entities/workout.entity';
import { AuthModule } from '../auth/auth.module';
import { PlanModule } from '../plan/plan.module';
import { PlanEntity } from '../plan/entities/plan.entity';

@Module({
  imports: [
    AuthModule,
    PlanModule,
    TypeOrmModule.forFeature([WorkoutEntity, PlanEntity]),
  ],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  // TODO: If not used in other modules remove it
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
