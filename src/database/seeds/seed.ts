// src/database/seeds/seed.ts
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
  console.log(savedUsers);
  //   const exercises = await seedExercises();
  //   const [savedClient, savedTrainer, savedAdmin] = savedUsers;
  //   const plans = await seedPlan(savedClient, savedAdmin);

  //   const [plan] = plans;
  //   const workouts = await seedWorkouts(plan, savedClient, savedTrainer);

  console.log({
    message: '✅ Initial data seeded successfully!',
    summary: {
      //   users: savedUsers.length,
      //   exercises: exercises.length,
      //   plans: plans.length,
      //   workouts: workouts.length,
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
