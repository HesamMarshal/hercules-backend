import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';

describe('WorkoutsController', () => {
  let controller: WorkoutsController;
  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsController],
      providers: [{ provide: WorkoutsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<WorkoutsController>(WorkoutsController);
  });

  it('should call service.create on POST', async () => {
    const dto = {
      planId: 1,
      name: 'Workout1',
      order: 1,
      day_of_week: 'MONDAY',
    };
    serviceMock.create.mockResolvedValue({ id: 123, ...dto });

    const result = await controller.create(dto);

    expect(serviceMock.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 123, ...dto });
  });
});
