// src/database/seeds/workout.seed.ts
import dataSource from '../data-source';
import { PlanEntity } from '../../modules/plan/entities/plan.entity';
import { WorkoutEntity } from 'src/modules/workouts/entities/workout.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WeekDays } from 'src/modules/workouts/enums/weekDays.enum';

export async function seedWorkouts(
  plan: PlanEntity,
  client: UserEntity,
  createdBy: UserEntity,
) {
  const repo = dataSource.getRepository(WorkoutEntity);

  const count = await repo.count();
  if (count > 0) {
    console.log('🏋️ Workouts already exist, skipping workout seed');
    return;
  }

  //   const beginnerPlan = await planRepo.findOneBy({ name: 'Beginner Plan' });
  //   const strengthPlan = await planRepo.findOneBy({ name: 'Strength Plan' });

  if (!plan) {
    console.log('⚠️ Plans must be seeded before workouts');
    return;
  }

  const workoutsData = [
    {
      name: 'Upper Body Strength',
      order: 1,
      day_of_week: WeekDays.Sat,
      plan: plan,
      user: client,
      createdBy: createdBy,
    },
    {
      name: 'Lower Body Power',
      order: 2,
      day_of_week: WeekDays.Sun,
      plan: plan,
      user: client,
      createdBy: createdBy,
    },
    {
      name: 'Full Body Conditioning',
      order: 3,
      day_of_week: WeekDays.Mon,
      plan: plan,
      user: client,
      createdBy: createdBy,
    },
    {
      name: 'Active Recovery',
      order: 4,
      day_of_week: WeekDays.Tue,
      plan: plan,
      user: client,
      createdBy: createdBy,
    },
  ];

  const workouts = workoutsData.map((data) => repo.create(data));
  const result = await repo.save(workouts);
  console.log('🏋️ Workouts seeded');
  return result;
}
