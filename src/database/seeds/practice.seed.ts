// src/database/seeds/practice.seed.ts
import dataSource from '../data-source';
import { PracticeEntity } from '../../modules/practice/entities/practice.entity';
import { ExerciseEntity } from '../../modules/exercise/entities/exercise.entity';
import { WorkoutEntity } from 'src/modules/workouts/entities/workout.entity';
import { SetType } from 'src/modules/practice/enums/setType.enum';
import { PracticeStatus } from 'src/modules/practice/enums/practiceStatus.enum';

export async function seedPractices() {
  const repo = dataSource.getRepository(PracticeEntity);
  const workoutRepo = dataSource.getRepository(WorkoutEntity);
  const exerciseRepo = dataSource.getRepository(ExerciseEntity);

  const count = await repo.count();
  if (count > 0) {
    console.log('🏃 Practices already exist, skipping practice seed');
    return;
  }

  const workout = await workoutRepo.findOneBy({ id: 1 });

  const bench = await exerciseRepo.findOneBy({ slug: 'bench-press-barbell' });
  const squat = await exerciseRepo.findOneBy({ slug: 'squat-barbell' });
  const abWheel = await exerciseRepo.findOneBy({ slug: 'ab-wheel' });

  if (!workout || !bench || !squat) {
    console.log('⚠️ Workouts & Exercises must be seeded before practices');
    return;
  }

  const practices = repo.create([
    {
      order: 1,
      sets: 3,
      reps: 10,
      set_type: SetType.WORKING,
      status: PracticeStatus.PLANNED,
      workout: workout,
      exercise: bench,
    },
    {
      order: 2,
      sets: 3,
      reps: 10,
      set_type: SetType.WORKING,
      status: PracticeStatus.PLANNED,
      workout: workout,
      exercise: squat,
    },
    {
      order: 3,
      sets: 3,
      reps: 10,
      set_type: SetType.WORKING,
      status: PracticeStatus.PLANNED,
      workout: workout,
      exercise: abWheel,
    },
  ]);

  const result = await repo.save(practices);
  console.log('🏃 Practices seeded');
  return result.length;
}
