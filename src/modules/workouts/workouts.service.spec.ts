import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsService } from './workouts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WorkoutEntity } from './entities/workout.entity';
import { PlanService } from '../plan/plan.service';
import { NotFoundException } from '@nestjs/common';

// Simple mock repository factory
const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('WorkoutsService', () => {
  let service: WorkoutsService;
  let repoMock: ReturnType<typeof mockRepository>;
  let planServiceMock: { findOne: jest.Mock };

  beforeEach(async () => {
    planServiceMock = { findOne: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutsService,
        {
          provide: getRepositoryToken(WorkoutEntity),
          useFactory: mockRepository,
        },
        { provide: PlanService, useValue: planServiceMock },
      ],
    }).compile();

    service = module.get<WorkoutsService>(WorkoutsService);
    repoMock = module.get(getRepositoryToken(WorkoutEntity));
  });

  it('should throw NotFoundException if plan not found', async () => {
    planServiceMock.findOne.mockResolvedValue(null);
    await expect(
      service.create({
        planId: 1,
        name: 'Test',
        order: 1,
        day_of_week: 'MONDAY',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should create workout if plan exists', async () => {
    planServiceMock.findOne.mockResolvedValue({ id: 1 });
    repoMock.create.mockReturnValue({ name: 'Test' });
    repoMock.save.mockResolvedValue({ id: 99, name: 'Test' });

    const result = await service.create({
      planId: 1,
      name: 'Test',
      order: 1,
      day_of_week: 'MONDAY',
    });

    expect(repoMock.create).toHaveBeenCalled();
    expect(repoMock.save).toHaveBeenCalled();
    expect(result).toEqual({ id: 99, name: 'Test' });
  });
});
