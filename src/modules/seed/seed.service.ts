// src/modules/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Roles } from '../../common/enum/role.enum';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async seedInitialData() {
    try {
      // Check if data already exists
      const existingUsers = await this.userRepository.count();
      if (existingUsers > 0) {
        return { message: 'Database already has data, skipping seeding.' };
      }

      // Create a admin user
      //   const trainerPassword = await bcrypt.hash('trainer123', 10);
      const admin = this.userRepository.create({
        // first_name: 'Hesam',
        // last_name: 'Marshal',
        // email: 'admin@hercules.com',
        mobile: '09173910003',
        mobile_verify: true,
        // password: trainerPassword,
        role: Roles.ADMIN,
      });

      // Create a trainer user
      //   const trainerPassword = await bcrypt.hash('trainer123', 10);
      const trainer = this.userRepository.create({
        // first_name: 'John',
        // last_name: 'Trainer',
        // email: 'trainer@hercules.com',
        mobile: '09173910002',
        mobile_verify: true,
        // password: trainerPassword,
        role: Roles.TRAINER,
      });

      // Create a client user
      //   const clientPassword = await bcrypt.hash('client123', 10);
      const client = this.userRepository.create({
        // first_name: 'Alice',
        // last_name: 'Client',
        // email: 'client@hercules.com',
        mobile: '09173910001',
        mobile_verify: true,
        // password: clientPassword,
        role: Roles.CLIENT,
      });

      // Save users to database
      await this.userRepository.save([client, trainer, admin]);

      return { message: 'Initial data seeded successfully!' };
    } catch (error) {
      throw new Error(`Seeding failed: ${error.message}`);
    }
  }

  async clearData() {
    try {
      // Clear all data (use with caution!)
      await this.userRepository.clear();
      return { message: 'All data cleared successfully!' };
    } catch (error) {
      throw new Error(`Data clearing failed: ${error.message}`);
    }
  }
}
