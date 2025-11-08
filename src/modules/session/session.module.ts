import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './entities/session.entity';
import { SessionPracticeEntity } from './entities/session-practice.entity';
import { PracticeSetEntity } from './entities/practice-set.entity';
import { PracticeEntity } from '../practice/entities/practice.entity';
import { WorkoutEntity } from '../workouts/entities/workout.entity';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SessionEntity,
      SessionPracticeEntity,
      PracticeSetEntity,
      PracticeEntity,
      WorkoutEntity,
      UserEntity,
    ]),
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
