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
import { createSlug } from 'src/common/utility/function.utils';
import { EquipmentType } from '../exercise/enums/equipment.enum';
import { MuscleGroup } from '../exercise/enums/muscleGroup.enum';
import { MetricType } from '../exercise/enums/metric.enum';
import { DifficultyLevel } from '../exercise/enums/difficulty.enum';

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
        name_en: 'Ab Wheel Rollout',
        name_fa: 'حرکت رول با چرخ شکم',
        slug: createSlug('Ab Wheel Rollout'),
        instruction_en: `
    1. Hold the ab wheel with both hands and kneel on the floor.
    2. Place the wheel in front of your knees — this is your starting position.
    3. Slowly roll the wheel forward, extending your torso as far as possible without touching the floor.
    4. Pause for a moment when fully stretched.
    5. Pull yourself back by contracting your abs.`,
        instruction_fa: `
    ۱. چرخ شکم را با هر دو دست بگیرید و روی زانوها قرار بگیرید.
    ۲. چرخ را جلوی زانوها روی زمین بگذارید (وضعیت شروع).
    ۳. به‌آرامی چرخ را به جلو بغلتانید تا بدن کاملاً کشیده شود بدون اینکه بدن با زمین تماس پیدا کند.
    ۴. در حالت کشیده کمی مکث کنید.
    ۵. با منقبض کردن شکم به حالت اول بازگردید.`,
        equipment: EquipmentType.OTHER,
        muscle_group: MuscleGroup.CORE,
        metric_type: MetricType.REPS,
        difficulty: DifficultyLevel.INTERMEDIATE,
        video_link: '',
        image: '',
        image_key: '',
      },

      {
        name_en: 'Arnold Press',
        name_fa: 'پرس آرنولدی',
        slug: createSlug('Arnold Press'),
        instruction_en: `
    1. Sit upright on a bench holding a dumbbell in each hand at chest level, palms facing you.
    2. Raise the dumbbells while rotating your palms outward until they face forward.
    3. Fully extend your arms overhead.
    4. Lower the dumbbells while rotating your palms back toward your body.
    5. Repeat for reps.`,
        instruction_fa: `
    ۱. صاف روی نیمکت بنشینید و دمبل‌ها را در سطح سینه بگیرید، کف دست‌ها رو به بدن.
    ۲. همزمان با بالا بردن دمبل‌ها، کف دست‌ها را به بیرون بچرخانید تا رو به جلو شوند.
    ۳. دست‌ها را کاملاً بالای سر باز کنید.
    ۴. دمبل‌ها را پایین بیاورید و کف دست‌ها را به سمت بدن برگردانید.
    ۵. تکرار کنید.`,
        equipment: EquipmentType.DUMBBELL,
        muscle_group: MuscleGroup.SHOULDERS,
        metric_type: MetricType.REPS,
        difficulty: DifficultyLevel.INTERMEDIATE,
        video_link: '',
        image: '',
        image_key: '',
      },

      {
        name_en: 'Barbell Squat',
        name_fa: 'اسکوات با هالتر',
        slug: createSlug('Barbell Squat'),
        instruction_en: `
    1. Stand with your feet shoulder-width apart and the barbell resting on your upper back.
    2. Keep your chest up and back straight.
    3. Lower your body by bending your knees and hips until your thighs are parallel to the ground.
    4. Push through your heels to return to the start.
    5. Repeat for reps.`,
        instruction_fa: `
    ۱. بایستید، پاها به اندازه‌ی عرض شانه باز و هالتر را روی قسمت بالای پشت قرار دهید.
    ۲. سینه را بالا و کمر را صاف نگه دارید.
    ۳. با خم کردن زانوها و باسن پایین بروید تا ران‌ها تقریباً موازی زمین شوند.
    ۴. با فشار پاشنه‌ها به حالت ایستاده بازگردید.
    ۵. تکرار کنید.`,
        equipment: EquipmentType.BARBELL,
        muscle_group: MuscleGroup.LEGS,
        metric_type: MetricType.WEIGHT,
        difficulty: DifficultyLevel.INTERMEDIATE,
        video_link: '',
        image: '',
        image_key: '',
      },

      {
        name_en: 'Bench Press',
        name_fa: 'پرس سینه با هالتر',
        slug: createSlug('Bench Press'),
        instruction_en: `
    1. Lie flat on a bench and grip the barbell slightly wider than shoulder-width.
    2. Lower the bar slowly to your mid-chest.
    3. Push the bar upward until your arms are fully extended.
    4. Control the bar as you lower it again.
    5. Repeat for reps.`,
        instruction_fa: `
    ۱. به‌صورت صاف روی نیمکت دراز بکشید و هالتر را کمی بازتر از عرض شانه بگیرید.
    ۲. به‌آرامی هالتر را تا وسط سینه پایین بیاورید.
    ۳. هالتر را بالا ببرید تا دست‌ها صاف شوند.
    ۴. با کنترل پایین بیاورید.
    ۵. تکرار کنید.`,
        equipment: EquipmentType.BARBELL,
        muscle_group: MuscleGroup.CHEST,
        metric_type: MetricType.WEIGHT,
        difficulty: DifficultyLevel.INTERMEDIATE,
        video_link: '',
        image: '',
        image_key: '',
      },

      {
        name_en: 'Deadlift',
        name_fa: 'ددلیفت',
        slug: createSlug('Deadlift'),
        instruction_en: `
    1. Stand with feet hip-width apart and grip the barbell outside your knees.
    2. Keep your back straight and chest up.
    3. Lift the bar by extending hips and knees simultaneously.
    4. Stand tall, then lower the bar in a controlled motion.
    5. Repeat for reps.`,
        instruction_fa: `
    ۱. بایستید، پاها به اندازه لگن باز و هالتر را بیرون از زانوها بگیرید.
    ۲. کمر را صاف و سینه را بالا نگه دارید.
    ۳. با صاف کردن باسن و زانو، هالتر را بالا ببرید.
    ۴. در حالت ایستاده توقف کرده و سپس به‌آرامی پایین بیاورید.
    ۵. تکرار کنید.`,
        equipment: EquipmentType.BARBELL,
        muscle_group: MuscleGroup.BACK,
        metric_type: MetricType.WEIGHT,
        difficulty: DifficultyLevel.INTERMEDIATE,
        video_link: '',
        image: '',
        image_key: '',
      },

      {
        name_en: 'Pull-Up',
        name_fa: 'بارفیکس',
        slug: createSlug('Pull-Up'),
        instruction_en: `
    1. Grip the pull-up bar with your palms facing away, hands shoulder-width apart.
    2. Hang freely with your arms fully extended.
    3. Pull yourself up until your chin passes the bar.
    4. Lower yourself back to the start in a controlled manner.
    5. Repeat for reps.`,
        instruction_fa: `
    ۱. میله بارفیکس را با کف دست رو به جلو و به اندازه‌ی عرض شانه بگیرید.
    ۲. آویزان شوید تا دست‌ها صاف شوند.
    ۳. خود را بالا بکشید تا چانه از میله عبور کند.
    ۴. به‌آرامی پایین برگردید.
    ۵. تکرار کنید.`,
        equipment: EquipmentType.BODYWEIGHT,
        muscle_group: MuscleGroup.BACK,
        metric_type: MetricType.REPS,
        difficulty: DifficultyLevel.INTERMEDIATE,
        video_link: '',
        image: '',
        image_key: '',
      },

      {
        name_en: 'Lunges',
        name_fa: 'لانج',
        slug: createSlug('Lunges'),
        instruction_en: `
    1. Stand tall with your feet hip-width apart.
    2. Step forward with one leg and lower until both knees are at about 90 degrees.
    3. Push back to the starting position using your front leg.
    4. Alternate legs and repeat.`,
        instruction_fa: `
    ۱. صاف بایستید و پاها را به اندازه لگن باز کنید.
    ۲. با یک پا به جلو گام بردارید و بدن را پایین بیاورید تا هر دو زانو زاویه ۹۰ درجه بگیرند.
    ۳. با فشار پای جلو به حالت اول بازگردید.
    ۴. پاها را عوض کنید و تکرار کنید.`,
        equipment: EquipmentType.BODYWEIGHT,
        muscle_group: MuscleGroup.LEGS,
        metric_type: MetricType.REPS,
        difficulty: DifficultyLevel.BEGINNER,
        video_link: '',
        image: '',
        image_key: '',
      },

      {
        name_en: 'Lat Pulldown',
        name_fa: 'لت سیم‌کش',
        slug: createSlug('Lat Pulldown'),
        instruction_en: `
    1. Sit on the lat pulldown machine and grip the bar wider than shoulder-width.
    2. Lean back slightly and pull the bar down to your upper chest.
    3. Squeeze your back muscles, then slowly let the bar rise.
    4. Repeat for reps.`,
        instruction_fa: `
    ۱. روی دستگاه لت بنشینید و میله را بازتر از عرض شانه بگیرید.
    ۲. کمی به عقب متمایل شوید و میله را تا بالای سینه پایین بیاورید.
    ۳. عضلات پشت را منقبض کنید و سپس میله را به‌آرامی بالا ببرید.
    ۴. تکرار کنید.`,
        equipment: EquipmentType.CABLE,
        muscle_group: MuscleGroup.BACK,
        metric_type: MetricType.REPS,
        difficulty: DifficultyLevel.BEGINNER,
        video_link: '',
        image: '',
        image_key: '',
      },

      {
        name_en: 'Bicep Curl',
        name_fa: 'جلوبازو با دمبل',
        slug: createSlug('Bicep Curl'),
        instruction_en: `
    1. Stand holding a dumbbell in each hand, palms facing forward.
    2. Keep elbows close to your torso.
    3. Curl the weights up while contracting your biceps.
    4. Slowly lower back to the start.
    5. Repeat for reps.`,
        instruction_fa: `
    ۱. بایستید و دمبل‌ها را در دو دست بگیرید، کف دست‌ها رو به جلو.
    ۲. آرنج‌ها را نزدیک بدن نگه دارید.
    ۳. با منقبض کردن عضله بازو، دمبل‌ها را بالا بیاورید.
    ۴. به‌آرامی به حالت اول بازگردید.
    ۵. تکرار کنید.`,
        equipment: EquipmentType.DUMBBELL,
        muscle_group: MuscleGroup.BICEPS,
        metric_type: MetricType.REPS,
        difficulty: DifficultyLevel.BEGINNER,
        video_link: '',
        image: '',
        image_key: '',
      },

      {
        name_en: 'Standing Calf Raise',
        name_fa: 'ساق ایستاده',
        slug: createSlug('Standing Calf Raise'),
        instruction_en: `
    1. Stand with your feet hip-width apart.
    2. Push through the balls of your feet to lift your heels as high as possible.
    3. Pause briefly, then lower back down slowly.
    4. Repeat for reps.`,
        instruction_fa: `
    ۱. بایستید، پاها به اندازه‌ی عرض لگن باز.
    ۲. با فشار روی پنجه پاها، پاشنه‌ها را بالا بیاورید.
    ۳. کمی مکث کنید، سپس به‌آرامی پایین برگردید.
    ۴. تکرار کنید.`,
        equipment: EquipmentType.BODYWEIGHT,
        muscle_group: MuscleGroup.CALVES,
        metric_type: MetricType.REPS,
        difficulty: DifficultyLevel.BEGINNER,
        video_link: '',
        image: '',
        image_key: '',
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
