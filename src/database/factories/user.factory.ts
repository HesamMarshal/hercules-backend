// src/database/factories/user.factory.ts
import { faker } from '@faker-js/faker';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { Roles } from 'src/common/enum/role.enum';

export function createUser(): Partial<UserEntity> {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    mobile: faker.phone.number(),
    mobile_verify: true,
    birth_date: faker.date.between({
      from: '1980-01-01T00:00:00.000Z',
      to: '2025-01-01T00:00:00.000Z',
    }), // '2026-05-16T02:22:53.002Z'
    role: Roles.CLIENT,
  };
}
