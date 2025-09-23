import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from './entities/exercise.entity';
import { S3Service } from '../S3/s3.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ExerciseEntity])],
  controllers: [ExerciseController],
  providers: [ExerciseService, S3Service],
  // TODO : Check if not used remove it
  exports: [ExerciseService], // Export if needed by other modules
})
export class ExerciseModule {}
