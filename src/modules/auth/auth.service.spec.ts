import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
// import { MockUserRepository } from 'test/mocks/user.repository.mock';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       AuthService,
  //       UserService,
  //       JwtService,
  //       {
  //         provide: getRepositoryToken(UserEntity),
  //         useClass: MockUserRepository,
  //       },
  //       {
  //         provide: JwtService,
  //         useValue: {
  //           sign: jest.fn(() => 'mock-jwt-token'),
  //           verify: jest.fn(),
  //         },
  //       },
  //     ],
  //   }).compile();

  //   service = module.get<AuthService>(AuthService);
  //   jwtService = module.get<JwtService>(JwtService);
  //   userService = module.get<UserService>(UserService);
  // });

  describe('validateUser', () => {
    // it('should return user if validation is successful', async () => {
    //   const mockUser = {
    //     id: 1,
    //     mobile: '+1234567890',
    //     password: await bcrypt.hash('password', 10),
    //   };

    //   jest
    //     .spyOn(userService, 'findOneByMobile')
    //     .mockResolvedValue(mockUser as UserEntity);
    //   jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

    //   const result = await service.validateUser('+1234567890', 'password');
    //   expect(result).toEqual(mockUser);
    // });

    // it('should return null if user not found', async () => {
    //   jest.spyOn(userService, 'findOneByMobile').mockResolvedValue(null);

    //   const result = await service.validateUser('+9999999999', 'password');
    //   expect(result).toBeNull();
    // });
    it('just a test: ', () => {
      expect(2).toEqual(2);
    });
  });
});
