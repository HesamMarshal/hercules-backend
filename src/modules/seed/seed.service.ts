// src/modules/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Roles } from '../../common/enum/role.enum';
import { UserEntity } from '../user/entities/user.entity';
import { PlanEntity } from '../plan/entities/plan.entity';
import { WorkoutEntity } from '../workouts/entities/workout.entity';
import { ExerciseEntity } from '../exercise/entities/exercise.entity';
import { WeekDays } from '../workouts/enums/weekDays.enum';
import { ExerciseType } from '../exercise/enums/exerciseType.enum';
import { CategoryExercise } from '../exercise/enums/category.enum';
import { BodyPart } from '../exercise/enums/bodyPart.enum';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,
    @InjectRepository(WorkoutEntity)
    private readonly workoutRepository: Repository<WorkoutEntity>,
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
  ) {}

  async seedInitialData() {
    try {
      // Check if data already exists
      console.log('Here');
      const existingUsers = await this.userRepository.count();
      if (existingUsers > 0) {
        return { message: 'Database already has data, skipping seeding.' };
      }

      // Create an admin user
      //   const trainerPassword = await bcrypt.hash('trainer123', 10);
      const admin = this.userRepository.create({
        first_name: 'Hercules',
        last_name: 'Admin',
        mobile: '09173910003',
        email: 'admin@hercules.com',
        mobile_verify: true,
        // password: trainerPassword,
        role: Roles.ADMIN,
      });

      // Create a trainer user
      //   const trainerPassword = await bcrypt.hash('trainer123', 10);
      const trainer = this.userRepository.create({
        first_name: 'John',
        last_name: 'Trainer',
        email: 'trainer@hercules.com',
        mobile: '09173910002',
        mobile_verify: true,
        // password: trainerPassword,
        role: Roles.TRAINER,
      });

      // Create a client user
      //   const clientPassword = await bcrypt.hash('client123', 10);
      const client = this.userRepository.create({
        first_name: 'Hesam',
        last_name: 'Marshal',
        email: 'client@hercules.com',
        mobile: '09173910001',
        mobile_verify: true,
        // password: clientPassword,
        role: Roles.CLIENT,
      });

      // Save users first
      const savedUsers = await this.userRepository.save([
        client,
        trainer,
        admin,
      ]);
      const [savedClient, savedTrainer, savedAdmin] = savedUsers;

      // Create exercises
      const exercises = await this.createExercises();

      // Create a plan for the client
      const plan = await this.createPlan(savedClient, savedTrainer);

      // Create workouts for the plan
      const workouts = await this.createWorkouts(
        plan,
        savedClient,
        savedTrainer,
      );

      return {
        message: 'Initial data seeded successfully!',
        summary: {
          users: savedUsers.length,
          exercises: exercises.length,
          plans: 1,
          workouts: workouts.length,
        },
      };
    } catch (error) {
      throw new Error(`Seeding failed: ${error.message}`);
    }
  }
  async seedUsers() {
    try {
      // Check if data already exists
      const existingUsers = await this.userRepository.count();
      if (existingUsers > 0) {
        return { message: 'Database already has data, skipping seeding.' };
      }

      // Create an admin user
      //   const trainerPassword = await bcrypt.hash('trainer123', 10);
      const admin = this.userRepository.create({
        first_name: 'Hercules',
        last_name: 'Admin',
        mobile: '09173910003',
        email: 'admin@hercules.com',
        mobile_verify: true,
        // password: trainerPassword,
        role: Roles.ADMIN,
      });

      // Create a trainer user
      //   const trainerPassword = await bcrypt.hash('trainer123', 10);
      const trainer = this.userRepository.create({
        first_name: 'John',
        last_name: 'Trainer',
        email: 'trainer@hercules.com',
        mobile: '09173910002',
        mobile_verify: true,
        // password: trainerPassword,
        role: Roles.TRAINER,
      });

      // Create a client user
      //   const clientPassword = await bcrypt.hash('client123', 10);
      const client = this.userRepository.create({
        first_name: 'Hesam',
        last_name: 'Marshal',
        email: 'client@hercules.com',
        mobile: '09173910001',
        mobile_verify: true,
        // password: clientPassword,
        role: Roles.CLIENT,
      });

      // Save users to database
      await this.userRepository.save([client, trainer, admin]);

      return { message: 'Initial data seeded successfully!' };
    } catch (error) {
      throw new Error(`Seeding failed: ${error.message}`);
    }
  }

  private async createExercises(): Promise<ExerciseEntity[]> {
    const exercisesData = [
      {
        name: 'Push-ups',
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
        instruction: 'Upper body exercise focusing on back and biceps strength',
        category: CategoryExercise.BodyWeight,
        body_part: BodyPart.Back,
        exercise_type: ExerciseType.RepsOnly,
        equipment: 'Pull-up bar',
        difficulty_level: 'Intermediate',
      },
      {
        name: 'Bench Press',
        instruction: 'Compound exercise for chest development',
        category: CategoryExercise.Barbell,
        body_part: BodyPart.Chest,
        exercise_type: ExerciseType.RepsAndWeight,

        equipment: 'Barbell, Bench',
        difficulty_level: 'Intermediate',
      },
      {
        name: 'Deadlift',
        instruction: 'Full-body compound movement for overall strength',
        category: CategoryExercise.Barbell,
        body_part: BodyPart.FullBody,
        exercise_type: ExerciseType.RepsAndWeight,
        equipment: 'Barbell',
        difficulty_level: 'Advanced',
      },
    ];

    const exercises = exercisesData.map((data) =>
      this.exerciseRepository.create(data),
    );

    return await this.exerciseRepository.save(exercises);
  }

  private async createPlan(
    client: UserEntity,
    createdBy: UserEntity,
  ): Promise<PlanEntity> {
    let start_date = new Date();
    let end_date = new Date();
    end_date.setDate(start_date.getDate() + 30);
    const plan = this.planRepository.create({
      name: '1st Month Plan',
      order: 1,
      start_date,
      end_date,

      user: client,
      // createdBy: createdBy,
    });

    return await this.planRepository.save(plan);
  }
  async clearData() {
    try {
      // Clear data in correct order to respect foreign key constraints
      await this.workoutRepository.delete({});
      await this.planRepository.delete({});
      await this.exerciseRepository.delete({});
      await this.userRepository.delete({});

      return { message: 'All data cleared successfully!' };
    } catch (error) {
      throw new Error(`Data clearing failed: ${error.message}`);
    }
  }

  private async createWorkouts(
    plan: PlanEntity,
    client: UserEntity,
    createdBy: UserEntity,
  ): Promise<WorkoutEntity[]> {
    const workoutsData = [
      {
        name: 'Upper Body Strength',
        order: 1,
        day_of_week: WeekDays.Sat,
        plan: plan,
        user: client,
        createdBy: createdBy,
      },
      {
        name: 'Lower Body Power',
        order: 2,
        day_of_week: WeekDays.Sun,
        plan: plan,
        user: client,
        createdBy: createdBy,
      },
      {
        name: 'Full Body Conditioning',
        order: 3,
        day_of_week: WeekDays.Mon,
        plan: plan,
        user: client,
        createdBy: createdBy,
      },
      {
        name: 'Active Recovery',
        order: 4,
        day_of_week: WeekDays.Tue,
        plan: plan,
        user: client,
        createdBy: createdBy,
      },
    ];

    const workouts = workoutsData.map((data) =>
      this.workoutRepository.create(data),
    );

    return await this.workoutRepository.save(workouts);
  }

  // Additional method to seed only exercises (useful for development)
  async seedExercisesOnly() {
    try {
      const existingExercises = await this.exerciseRepository.count();
      if (existingExercises > 0) {
        return { message: 'Exercises already exist, skipping.' };
      }

      const exercises = await this.createExercises();
      return {
        message: 'Exercises seeded successfully!',
        count: exercises.length,
      };
    } catch (error) {
      throw new Error(`Exercise seeding failed: ${error.message}`);
    }
  }

  // Method to seed sample plans and workouts for existing users
  async seedSampleWorkouts() {
    try {
      // Get existing client and trainer
      const client = await this.userRepository.findOne({
        where: { role: Roles.CLIENT },
      });
      const trainer = await this.userRepository.findOne({
        where: { role: Roles.TRAINER },
      });

      if (!client || !trainer) {
        throw new Error(
          'Client or trainer not found. Please seed users first.',
        );
      }

      const plan = await this.createPlan(client, trainer);
      const workouts = await this.createWorkouts(plan, client, trainer);

      return {
        message: 'Sample workouts seeded successfully!',
        plan: plan.name,
        workouts: workouts.length,
      };
    } catch (error) {
      throw new Error(`Workout seeding failed: ${error.message}`);
    }
  }
}
