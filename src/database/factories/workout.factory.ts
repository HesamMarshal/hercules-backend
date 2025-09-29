// src/database/factories/workout.factory.ts
import { faker } from '@faker-js/faker';
import { PlanEntity } from '../../modules/plan/entities/plan.entity';
import { WorkoutEntity } from 'src/modules/workouts/entities/workout.entity';

export function createWorkout(plan: PlanEntity): Partial<WorkoutEntity> {
  return {
    name: faker.lorem.words(3), // e.g. "Chest Pump Routine"
    plan,
  };
}
