// // src/database/seeds/practice.seed.ts
// import dataSource from '../data-source';
// import { PracticeEntity } from '../../modules/practice/entities/practice.entity';
// import { ExerciseEntity } from '../../modules/exercise/entities/exercise.entity';
// import { WorkoutEntity } from 'src/modules/workouts/entities/workout.entity';

// export async function seedPractices() {
//   const repo = dataSource.getRepository(PracticeEntity);
//   const workoutRepo = dataSource.getRepository(WorkoutEntity);
//   const exerciseRepo = dataSource.getRepository(ExerciseEntity);

//   const count = await repo.count();
//   if (count > 0) {
//     console.log('🏃 Practices already exist, skipping practice seed');
//     return;
//   }

//   const workout = await workoutRepo.findOneBy({
//     name: '1st Month Plan',
//   });
//   const bench = await exerciseRepo.findOneBy({ name: 'Bench Press' });
//   const squat = await exerciseRepo.findOneBy({ name: 'Squat' });

//   if (!workout || !bench || !squat) {
//     console.log('⚠️ Workouts & Exercises must be seeded before practices');
//     return;
//   }

//   const practices = repo.create([
//     { workout, exercise: bench, sets: 3, reps: 10, rest: 90 },
//     { workout, exercise: squat, sets: 3, reps: 12, rest: 120 },
//   ]);

//   await repo.save(practices);
//   console.log('🏃 Practices seeded');
// }
