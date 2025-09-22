import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WorkoutsService } from './workouts.service';
import { WorkoutEntity } from './entities/workout.entity';
import { PlanEntity } from '../plan/entities/plan.entity';
import { REQUEST } from '@nestjs/core';
import { Roles } from '../../common/enum/role.enum';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('WorkoutsService', () => {
  let service: WorkoutsService;

  // Mock repositories
  const mockWorkoutRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockPlanRepository = {
    findOne: jest.fn(),
  };

  // Mock request object with user
  const mockRequest = {
    user: {
      id: 1,
      role: Roles.TRAINER,
    },
  };

  it('just a test', () => {
    // TODO:remove it
    expect(2).toEqual(2);
  });

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       WorkoutsService,
  //       {
  //         provide: getRepositoryToken(WorkoutEntity),
  //         useValue: mockWorkoutRepository,
  //       },
  //       {
  //         provide: getRepositoryToken(PlanEntity),
  //         useValue: mockPlanRepository,
  //       },
  //       {
  //         provide: REQUEST,
  //         useValue: mockRequest, // Provide the mock request
  //       },
  //     ],
  //   }).compile();

  //   service = module.get<WorkoutsService>(WorkoutsService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  // describe('create', () => {
  //   it('should throw NotFoundException if plan not found', async () => {
  //     mockPlanRepository.findOne.mockResolvedValue(null);

  //     await expect(
  //       service.create({
  //         planId: 999,
  //         name: 'Test Workout',
  //         order: 1,
  //         day_of_week: 'MONDAY',
  //       }),
  //     ).rejects.toThrow(NotFoundException);
  //   });

  //   it('should create workout if plan exists', async () => {
  //     const mockPlan = { id: 1, name: 'Test Plan' };
  //     const mockWorkout = {
  //       id: 1,
  //       name: 'Test Workout',
  //       plan: mockPlan,
  //       user: { id: mockRequest.user.id },
  //     };

  //     mockPlanRepository.findOne.mockResolvedValue(mockPlan);
  //     mockWorkoutRepository.create.mockReturnValue(mockWorkout);
  //     mockWorkoutRepository.save.mockResolvedValue(mockWorkout);

  //     const result = await service.create({
  //       planId: 1,
  //       name: 'Test Workout',
  //       order: 1,
  //       day_of_week: 'MONDAY',
  //     });

  //     expect(result).toEqual(mockWorkout);
  //     expect(mockWorkoutRepository.create).toHaveBeenCalledWith({
  //       name: 'Test Workout',
  //       order: 1,
  //       day_of_week: 'MONDAY',
  //       plan: mockPlan,
  //       user: { id: mockRequest.user.id },
  //     });
  //   });

  //   it('should throw UnauthorizedException if user not in request', async () => {
  //     // Create a service instance without user in request
  //     const moduleWithoutUser: TestingModule = await Test.createTestingModule({
  //       providers: [
  //         WorkoutsService,
  //         {
  //           provide: getRepositoryToken(WorkoutEntity),
  //           useValue: mockWorkoutRepository,
  //         },
  //         {
  //           provide: getRepositoryToken(PlanEntity),
  //           useValue: mockPlanRepository,
  //         },
  //         {
  //           provide: REQUEST,
  //           useValue: {}, // Empty request without user
  //         },
  //       ],
  //     }).compile();

  //     const serviceWithoutUser =
  //       moduleWithoutUser.get<WorkoutsService>(WorkoutsService);

  //     await expect(
  //       serviceWithoutUser.create({
  //         planId: 1,
  //         name: 'Test Workout',
  //         order: 1,
  //         day_of_week: 'MONDAY',
  //       }),
  //     ).rejects.toThrow(UnauthorizedException);
  //   });
  // });
});
