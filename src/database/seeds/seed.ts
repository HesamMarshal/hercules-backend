// src/database/seeds/seed.ts
import { UserEntity } from 'src/modules/user/entities/user.entity';
import dataSource from '../data-source';
import { seedExercises } from './exercise.seed';
import { seedPlan } from './plan.seed';
import { runFactorySeed } from './seed.factory';
import { seedUsers } from './user.seed';
import { seedWorkouts } from './workout.seed';

async function runSeed() {
  await dataSource.initialize();

  console.log('🌱 Starting database seed...');

  const savedUsers = await seedUsers();
  const exercises = await seedExercises();
  const plan = await seedPlan();
  const workouts = await seedWorkouts();

  console.log({
    message: '✅ Initial data seeded successfully!',
    summary: {
      users: savedUsers,
      exercises: exercises,
      plans: plan,
      workouts: workouts,
    },
  });

  // ---- Factory seeds ----
  //   await runFactorySeed();

  await dataSource.destroy();
}

runSeed().catch((err) => {
  console.error('❌ Seeding failed', err);
  process.exit(1);
});
