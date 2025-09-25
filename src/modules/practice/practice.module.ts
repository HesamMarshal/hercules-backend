import { Module } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { PracticeController } from './practice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticeEntity } from './entities/practice.entity';
import { WorkoutEntity } from '../workouts/entities/workout.entity';
import { ExerciseEntity } from '../exercise/entities/exercise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PracticeEntity, WorkoutEntity, ExerciseEntity]),
  ],
  controllers: [PracticeController],
  providers: [PracticeService],
  exports: [PracticeService],
})
export class PracticeModule {}
