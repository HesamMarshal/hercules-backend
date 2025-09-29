// src/database/seeds/user.seed.ts
import dataSource from '../data-source';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { Roles } from 'src/common/enum/role.enum';
// import * as bcrypt from 'bcrypt';

export async function seedUsers() {
  const userRepo = dataSource.getRepository(UserEntity);

  const existingUsers = await userRepo.count();
  if (existingUsers > 0) {
    return { message: 'Database already has data, skipping seeding.' };
  }

  // Create an admin user
  //   const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = userRepo.create({
    first_name: 'Hercules',
    last_name: 'Admin',
    mobile: '09173918727',
    email: 'admin@hercules.com',
    mobile_verify: true,
    // password: adminPassword,
    role: Roles.ADMIN,
  });

  // Create a trainer user
  //   const trainerPassword = await bcrypt.hash('trainer123', 10);
  const trainer = userRepo.create({
    first_name: 'John',
    last_name: 'Trainer',
    email: 'trainer@hercules.com',
    mobile: '09173910002',
    mobile_verify: true,
    // password: trainerPassword,
    role: Roles.TRAINER,
  });

  // Create a client user
  //   const clientPassword = await bcrypt.hash('client123', 10);
  const client = userRepo.create({
    first_name: 'Hesam',
    last_name: 'Marshal',
    email: 'client@hercules.com',
    mobile: '09173910001',
    mobile_verify: true,
    // password: clientPassword,
    role: Roles.CLIENT,
  });

  // Save users first
  const savedUsers = await userRepo.save([client, trainer, admin]);
  //   const [savedClient, savedTrainer, savedAdmin] = savedUsers;

  console.log('👤 Users seeded');
  return savedUsers;
}
