import dataSource from '../data-source';
import { ExerciseEntity } from '../../modules/exercise/entities/exercise.entity';
import { MuscleGroup } from 'src/modules/exercise/enums/muscleGroup.enum';
import { createSlug } from 'src/common/utility/function.utils';
import { EquipmentType } from 'src/modules/exercise/enums/equipment.enum';
import { MetricType } from 'src/modules/exercise/enums/metric.enum';
import { DifficultyLevel } from 'src/modules/exercise/enums/difficulty.enum';

export async function seedExercises(): Promise<number> {
  const repo = dataSource.getRepository(ExerciseEntity);

  const count = await repo.count();
  if (count > 0) {
    console.log('💪 Exercises already exist, skipping exercise seed');
    return 0;
  }

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

  const exercises = exercisesData.map((data) => repo.create(data));
  const result = await repo.save(exercises);
  console.log('💪 Exercises seeded');
  return result.length;
}
