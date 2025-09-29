// src/database/factories/practice.factory.ts
import { faker } from '@faker-js/faker';
import { PracticeEntity } from '../../modules/practice/entities/practice.entity';
import { ExerciseEntity } from '../../modules/exercise/entities/exercise.entity';
import { SetType } from '../../modules/practice/enums/setType.enum';
import { PracticeStatus } from '../../modules/practice/enums/practiceStatus.enum';
import { WorkoutEntity } from 'src/modules/workouts/entities/workout.entity';

export function createPractice(
  workout: WorkoutEntity,
  exercise: ExerciseEntity,
): Partial<PracticeEntity> {
  return {
    workout,
    exercise,
    order: faker.number.int({ min: 1, max: 5 }),
    set_number: faker.number.int({ min: 1, max: 4 }),
    previous_weight: faker.number.float({
      min: 20,
      max: 100,
      //  precision: 0.5
    }),
    previous_reps: faker.number.int({ min: 6, max: 12 }),
    current_weight: faker.number.float({
      min: 20,
      max: 100,
      //  precision: 0.5
    }),
    current_reps: faker.number.int({ min: 6, max: 12 }),
    set_type: faker.helpers.arrayElement(Object.values(SetType)),
    status: faker.helpers.arrayElement(Object.values(PracticeStatus)),
    notes: faker.lorem.sentence(),
  };
}
