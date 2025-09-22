import { Roles } from 'src/common/enum/role.enum';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class UserFactory {
  static create(overrides: Partial<UserEntity> = {}): UserEntity {
    const user = new UserEntity();
    user.id = overrides.id || 1;
    user.first_name = overrides.first_name || 'Test';
    user.last_name = overrides.last_name || 'User';
    user.mobile = overrides.mobile || '+1234567890';
    user.email = overrides.email || 'test@example.com';
    user.role = overrides.role || Roles.CLIENT;
    // user.password = overrides.password || 'hashedpassword';
    user.created_at = overrides.created_at || new Date();
    user.updated_at = overrides.updated_at || new Date();
    return user;
  }

  static createClient(): UserEntity {
    return this.create({ role: Roles.CLIENT });
  }

  static createTrainer(): UserEntity {
    return this.create({ role: Roles.TRAINER });
  }

  static createAdmin(): UserEntity {
    return this.create({ role: Roles.ADMIN });
  }
}
