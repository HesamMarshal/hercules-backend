import dataSource from '../data-source';
import { PlanEntity } from 'src/modules/plan/entities/plan.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export async function seedPlan(): Promise<number> {
  const repo = dataSource.getRepository(PlanEntity);
  const userRepo = dataSource.getRepository(UserEntity);

  const count = await repo.count();
  if (count > 0) {
    console.log('📋 Plans already exist, skipping plan seed');
    return 0;
  }

  const client = await userRepo.findOneBy({ id: 3 });
  if (!client) {
    console.log('⚠️ client must be seeded before plan');
    return 0;
  }

  let start_date = new Date();
  let end_date = new Date();
  end_date.setDate(start_date.getDate() + 30);
  const plan = repo.create({
    name: '1st Month Plan',
    order: 1,
    start_date,
    end_date,
    user: client,
    // createdBy: createdBy,
  });

  const result = await repo.save(plan);
  console.log('Plan seeded');
  return 1;
}
