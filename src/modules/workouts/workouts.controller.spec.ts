import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

// Mock AuthGuard
const mockAuthGuard = {
  canActivate: jest.fn(() => true),
};

describe('WorkoutsController', () => {
  let controller: WorkoutsController;

  const serviceMock = {
    create: jest.fn(),
    findAllByPlanId: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  // Mock request object
  const mockRequest = {
    user: {
      id: 1,
      role: 'trainer',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsController],
      providers: [
        {
          provide: WorkoutsService,
          useValue: serviceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<WorkoutsController>(WorkoutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('POST /workouts', () => {
  //   it('should call service.create with correct parameters', async () => {
  //     const createWorkoutDto: CreateWorkoutDto = {
  //       planId: 1,
  //       name: 'Test Workout',
  //       order: 1,
  //       day_of_week: 'MONDAY',
  //     };

  //     const expectedResult = { id: 1, ...createWorkoutDto };
  //     serviceMock.create.mockResolvedValue(expectedResult);

  //     // const result = await controller.create(createWorkoutDto,mockRequest);
  //     const result = await controller.create(createWorkoutDto);

  //     // If your service.create method expects the user from request,
  //     // you might need to adjust the expectation
  //     expect(serviceMock.create).toHaveBeenCalledWith(createWorkoutDto);
  //     expect(result).toEqual(expectedResult);
  //   });
  // });

  // Add more test cases
  // describe('GET /workouts', () => {
  //   it('should call service.findAll with user info', async () => {
  //     const expectedResult = [{ id: 1, name: 'Test Workout' }];
  //     serviceMock.findAllByPlanId.mockResolvedValue(expectedResult);
  //     const planId: number = 1;
  //     const paginationDto: PaginationDto = { page: 1, limit: 10 };

  //     const result = await controller.findAllByPlanId(planId, paginationDto);

  //     expect(serviceMock.findAllByPlanId).toHaveBeenCalled();
  //     expect(result).toEqual(expectedResult);
  //   });
  // });

  // describe('GET /workouts/:id', () => {
  //   it('should call service.findOne with correct parameters', async () => {
  //     const workoutId = '1';
  //     const expectedResult = { id: 1, name: 'Test Workout' };
  //     serviceMock.findOne.mockResolvedValue(expectedResult);

  //     // const result = await controller.findOne(workoutId, mockRequest);
  //     const result = await controller.findOne(+workoutId);

  //     expect(serviceMock.findOne).toHaveBeenCalledWith(
  //       +workoutId,
  //       mockRequest.user.id,
  //       mockRequest.user.role,
  //     );
  //     expect(result).toEqual(expectedResult);
  //   });
  // });
});
