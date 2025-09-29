// src/database/seeds/seed.factory.ts
import dataSource from '../data-source';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { ExerciseEntity } from '../../modules/exercise/entities/exercise.entity';
import { PracticeEntity } from '../../modules/practice/entities/practice.entity';
import { PlanEntity } from '../../modules/plan/entities/plan.entity';
import { createUser } from '../factories/user.factory';
import { createWorkout } from '../factories/workout.factory';
import { createPractice } from '../factories/practice.factory';
import { WorkoutEntity } from 'src/modules/workouts/entities/workout.entity';

export async function runFactorySeed() {
  await dataSource.initialize();
  console.log('🌱 Starting factory seeding...');

  const userRepo = dataSource.getRepository(UserEntity);
  const planRepo = dataSource.getRepository(PlanEntity);
  const workoutRepo = dataSource.getRepository(WorkoutEntity);
  const exerciseRepo = dataSource.getRepository(ExerciseEntity);
  const practiceRepo = dataSource.getRepository(PracticeEntity);

  // ✅ Create dummy users
  const users = Array.from({ length: 20 }, () => userRepo.create(createUser()));
  await userRepo.save(users);
  console.log(`👤 ${users.length} users created`);

  // ✅ Create dummy workouts for each plan
  const plans = await planRepo.find();
  const workouts: WorkoutEntity[] = [];
  for (const plan of plans) {
    for (let i = 0; i < 5; i++) {
      workouts.push(workoutRepo.create(createWorkout(plan)));
    }
  }
  await workoutRepo.save(workouts);
  console.log(`🏋️ ${workouts.length} workouts created`);

  // ✅ Create dummy practices for each workout
  const exercises = await exerciseRepo.find();
  const practices: PracticeEntity[] = [];
  for (const workout of workouts) {
    const exercise = exercises[Math.floor(Math.random() * exercises.length)];
    for (let i = 0; i < 3; i++) {
      practices.push(practiceRepo.create(createPractice(workout, exercise)));
    }
  }
  await practiceRepo.save(practices);
  console.log(`🏃 ${practices.length} practices created`);

  console.log('✅ Factory seeding completed');
  await dataSource.destroy();
}
