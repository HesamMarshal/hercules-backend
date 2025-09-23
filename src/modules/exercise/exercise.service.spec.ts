import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExerciseService } from './exercise.service';
import { ExerciseEntity } from './entities/exercise.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('ExerciseService', () => {
  let service: ExerciseService;

  const mockExerciseRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseService,
        {
          provide: getRepositoryToken(ExerciseEntity),
          useValue: mockExerciseRepository,
        },
      ],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
  });

  describe('update', () => {
    it('should update an existing exercise', async () => {
      const existingExercise = { id: 1, name: 'Old Name' };
      const updateData = { name: 'New Name' };

      mockExerciseRepository.findOne.mockResolvedValue(existingExercise);
      mockExerciseRepository.save.mockResolvedValue({
        ...existingExercise,
        ...updateData,
      });

      const result = await service.update(1, updateData);

      expect(result.name).toBe('New Name');
      expect(mockExerciseRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException for non-existent exercise', async () => {
      mockExerciseRepository.findOne.mockResolvedValue(null);

      await expect(service.update(999, { name: 'New Name' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove an existing exercise', async () => {
      const exercise = { id: 1, name: 'Test Exercise' };
      mockExerciseRepository.findOne.mockResolvedValue(exercise);
      mockExerciseRepository.remove.mockResolvedValue(exercise);

      const result = await service.remove(1);

      expect(result.message).toContain('deleted successfully');
      expect(mockExerciseRepository.remove).toHaveBeenCalledWith(exercise);
    });

    it('should throw NotFoundException for non-existent exercise', async () => {
      mockExerciseRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
