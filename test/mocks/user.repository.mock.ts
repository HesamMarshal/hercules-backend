import { Repository } from 'typeorm';
import { UserFactory } from '../factories/user.factory';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class MockUserRepository {
  private users: UserEntity[] = [];

  constructor() {
    // super();
    // Initialize with some test users
    this.users = [
      UserFactory.createClient(),
      UserFactory.createTrainer(),
      UserFactory.createAdmin(),
    ];
  }

  async findOne(options: any): Promise<UserEntity | null> {
    const { where } = options;
    if (where.id) {
      return this.users.find((user) => user.id === where.id) || null;
    }
    if (where.email) {
      return this.users.find((user) => user.email === where.email) || null;
    }
    if (where.mobile) {
      return this.users.find((user) => user.mobile === where.mobile) || null;
    }
    return null;
  }

  async find(options?: any): Promise<UserEntity[]> {
    return this.users;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    if (!user.id) {
      user.id = Math.max(...this.users.map((u) => u.id)) + 1;
      this.users.push(user);
    } else {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users[index] = user;
      } else {
        this.users.push(user);
      }
    }
    return user;
  }

  async remove(user: UserEntity): Promise<UserEntity> {
    this.users = this.users.filter((u) => u.id !== user.id);
    return user;
  }
}
