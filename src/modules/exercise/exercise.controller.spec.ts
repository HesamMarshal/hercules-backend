import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { AuthGuard } from '../auth/guards/auth.guard';

// Mock the entire AuthGuard
const mockAuthGuard = {
  canActivate: jest.fn(() => true),
};

describe('ExerciseController', () => {
  let controller: ExerciseController;
  let service: ExerciseService;

  const mockExerciseService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseController],
      providers: [
        {
          provide: ExerciseService,
          useValue: mockExerciseService,
        },
      ],
    })
      .overrideGuard(AuthGuard) // Override the AuthGuard
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<ExerciseController>(ExerciseController);
    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of exercises', async () => {
      const result = [{ id: 1, name: 'Test Exercise' }];
      mockExerciseService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(mockExerciseService.findAll).toHaveBeenCalled();
    });
  });
});
