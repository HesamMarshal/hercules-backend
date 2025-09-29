import dataSource from '../data-source';
import { ExerciseEntity } from '../../modules/exercise/entities/exercise.entity';
import { ExerciseType } from 'src/modules/exercise/enums/exerciseType.enum';
import { BodyPart } from 'src/modules/exercise/enums/bodyPart.enum';
import { CategoryExercise } from 'src/modules/exercise/enums/category.enum';
import { createSlug } from 'src/common/utility/function.utils';

export async function seedExercises(): Promise<number> {
  const repo = dataSource.getRepository(ExerciseEntity);

  const count = await repo.count();
  if (count > 0) {
    console.log('💪 Exercises already exist, skipping exercise seed');
    return 0;
  }

  const exercisesData = [
    {
      name: 'Push-ups',
      slug: createSlug('Push-ups'),
      instruction:
        'A classic bodyweight exercise that targets the chest, shoulders, and triceps',
      category: CategoryExercise.BodyWeight,
      body_part: BodyPart.Chest,
      exercise_type: ExerciseType.RepsOnly,
      equipment: 'None',
      difficulty_level: 'Beginner',
    },
    {
      name: 'Squats',
      slug: createSlug('Squats'),
      instruction:
        'Fundamental lower body exercise targeting quads, glutes, and hamstrings',
      category: CategoryExercise.BodyWeight,
      body_part: BodyPart.Legs,
      exercise_type: ExerciseType.RepsAndWeight,
      equipment: 'Barbell',
      difficulty_level: 'Beginner',
    },
    {
      name: 'Pull-ups',
      slug: createSlug('Pull-ups'),
      instruction: 'Upper body exercise focusing on back and biceps strength',
      category: CategoryExercise.BodyWeight,
      body_part: BodyPart.Back,
      exercise_type: ExerciseType.RepsOnly,
      equipment: 'Pull-up bar',
      difficulty_level: 'Intermediate',
    },
    {
      name: 'Bench Press',
      slug: createSlug('Bench Press'),
      instruction: 'Compound exercise for chest development',
      category: CategoryExercise.Barbell,
      body_part: BodyPart.Chest,
      exercise_type: ExerciseType.RepsAndWeight,

      equipment: 'Barbell, Bench',
      difficulty_level: 'Intermediate',
    },
    {
      name: 'Deadlift',
      slug: createSlug('Deadlift'),
      instruction: 'Full-body compound movement for overall strength',
      category: CategoryExercise.Barbell,
      body_part: BodyPart.FullBody,
      exercise_type: ExerciseType.RepsAndWeight,
      equipment: 'Barbell',
      difficulty_level: 'Advanced',
    },
  ];

  const exercises = exercisesData.map((data) => repo.create(data));
  const result = await repo.save(exercises);
  console.log('💪 Exercises seeded');
  return result.length;
}
