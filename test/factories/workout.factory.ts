import { WorkoutEntity } from 'src/modules/workouts/entities/workout.entity';
import { UserFactory } from './user.factory';

export class WorkoutFactory {
  static create(overrides: Partial<WorkoutEntity> = {}): WorkoutEntity {
    const workout = new WorkoutEntity();
    workout.id = overrides.id || 1;
    workout.name = overrides.name || 'Test Workout';
    workout.order = overrides.order || 0;
    workout.day_of_week = overrides.day_of_week || 'Monday';
    // workout.user = overrides.user || UserFactory.createClient();
    // workout.created_at = overrides.created_at || new Date();
    // workout.updated_at = overrides.updated_at || new Date();
    return workout;
  }
}
