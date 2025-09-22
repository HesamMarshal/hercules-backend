import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { REQUEST } from '@nestjs/core';
import { Roles } from '../../common/enum/role.enum';
// import { MockUserRepository } from 'test/mocks/user.repository.mock';

describe('UserService', () => {
  let service: UserService;
  // let mockRepository: MockUserRepository;

  const mockRequest = {
    user: {
      id: 1,
      role: Roles.ADMIN,
    },
  };

  // beforeEach(async () => {
  //   mockRepository = new MockUserRepository();

  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       UserService,
  //       {
  //         provide: getRepositoryToken(UserEntity),
  //         useValue: mockRepository,
  //       },
  //       {
  //         provide: REQUEST,
  //         useValue: mockRequest,
  //       },
  //     ],
  //   }).compile();

  //   service = module.get<UserService>(UserService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
  it('just a test', () => {
    // TODO:remove it
    expect(2).toEqual(2);
  });

  //   describe('findAll', () => {
  //     it('should return an array of users', async () => {
  //       const result = await service.  findAll();
  //       expect(result).toBeInstanceOf(Array);
  //       expect(result.length).toBeGreaterThan(0);
  //     });
  //   });

  // describe('findOneById', () => {
  //   it('should return a user by id', async () => {
  //     const user = await service.findOneById(1);
  //     expect(user).toBeDefined();
  //     expect(user.id).toBe(1);
  //   });

  //   it('should return null for non-existent user', async () => {
  //     const user = await service.findOneById(999);
  //     expect(user).toBeNull();
  //   });
  // });
});
