// src/database/seeds/workout.seed.ts
import dataSource from '../data-source';
import { PlanEntity } from '../../modules/plan/entities/plan.entity';
import { WorkoutEntity } from 'src/modules/workouts/entities/workout.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WeekDays } from 'src/modules/workouts/enums/weekDays.enum';

export async function seedWorkouts(): Promise<number> {
  const repo = dataSource.getRepository(WorkoutEntity);
  const planRepo = dataSource.getRepository(PlanEntity);
  const userRepo = dataSource.getRepository(UserEntity);

  const count = await repo.count();
  if (count > 0) {
    console.log('🏋️ Workouts already exist, skipping workout seed');
    return 0;
  }

  const client = await userRepo.findOneBy({ id: 3 });
  if (!client) {
    console.log('⚠️ client must be seeded before plan');
    return 0;
  }

  const admin = await userRepo.findOneBy({ id: 1 });
  if (!client) {
    console.log('⚠️ client must be seeded before plan');
    return 0;
  }

  const firstPlan = await planRepo.findOneBy({ id: 1 });
  if (!firstPlan) {
    console.log('⚠️ Plans must be seeded before workouts');
    return 0;
  }
  const secPlan = await planRepo.findOneBy({ id: 2 });
  if (!firstPlan) {
    console.log('⚠️ Plans must be seeded before workouts');
    return 0;
  }
  const workoutsData = [
    {
      name: 'Upper Body Strength',
      order: 1,
      day_of_week: WeekDays.Sat,
      plan: firstPlan,
      user: client,
      createdBy: admin,
    },
    {
      name: 'Lower Body Power',
      order: 2,
      day_of_week: WeekDays.Sun,
      plan: firstPlan,
      user: client,
      createdBy: admin,
    },
    {
      name: 'Full Body Conditioning',
      order: 3,
      day_of_week: WeekDays.Mon,
      plan: firstPlan,
      user: client,
      createdBy: admin,
    },
    {
      name: 'Active Recovery',
      order: 4,
      day_of_week: WeekDays.Tue,
      plan: firstPlan,
      user: client,
      createdBy: admin,
    },
  ];

  const workouts = workoutsData.map((data) => repo.create(data));
  const result = await repo.save(workouts);
  console.log('🏋️ Workouts seeded');
  return result.length;
}
