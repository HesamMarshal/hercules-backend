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
      name_en: 'Ab Wheel',
      name_fa: 'چرخ شکم',
      slug: createSlug('Ab Wheel'),
      instruction_en: `
1. Kneel on the floor and hold the ab wheel with both hands.
2. Roll the wheel forward, extending your body until fully stretched.
3. Pause while keeping tension on the core.
4. Pull yourself back to the starting position.`,
      instruction_fa: `
۱. روی زانو قرار گرفته و چرخ شکم را با هر دو دست بگیرید.
۲. چرخ را به سمت جلو بغلتانید تا بدن کاملاً کشیده شود.
۳. لحظه‌ای مکث کنید.
۴. با منقبض کردن شکم به حالت شروع بازگردید.`,
      equipment: EquipmentType.OTHER,
      muscle_group: MuscleGroup.CORE,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Arnold Press (Dumbbell)',
      name_fa: 'پرس آرنولد با دمبل',
      slug: createSlug('Arnold Press Dumbbell'),
      instruction_en: `
1. Start seated or standing with dumbbells at chest height, palms facing inward.
2. Rotate palms outward as you press overhead.
3. Lower back to chest level while rotating palms inward.`,
      instruction_fa: `
۱. دمبل‌ها را در ارتفاع سینه گرفته و کف دست‌ها رو به داخل باشد.
۲. هنگام بالا بردن دمبل‌ها، کف دست‌ها را به بیرون بچرخانید.
۳. هنگام پایین آمدن، کف دست‌ها را دوباره به سمت داخل برگردانید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Around the World',
      name_fa: 'دور دنیا با دمبل',
      slug: createSlug('Around the World'),
      instruction_en: `
1. Lie on a bench holding dumbbells at your sides.
2. With straight arms, move the dumbbells in an arc over your head.
3. Reverse the motion to return to the start.`,
      instruction_fa: `
۱. روی نیمکت دراز بکشید و دمبل‌ها را در کنار بدن نگه دارید.
۲. با دست‌های صاف دمبل‌ها را به صورت دایره‌ای به سمت بالای سر حرکت دهید.
۳. حرکت را برعکس کرده و به حالت شروع بازگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Back Extension',
      name_fa: 'اکستنشن کمر',
      slug: createSlug('Back Extension'),
      instruction_en: `
1. Position yourself face down on a back extension bench.
2. Lower your torso until you feel a stretch.
3. Raise your torso by contracting your lower back.`,
      instruction_fa: `
۱. روی میز پشت قرار گرفته و پاها را ثابت کنید.
۲. بدن را پایین بیاورید تا کشش ایجاد شود.
۳. با انقباض کمر بالا آمده و به حالت شروع بازگردید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Back Extension (Machine)',
      name_fa: 'اکستنشن کمر با دستگاه',
      slug: createSlug('Back Extension Machine'),
      instruction_en: `
1. Sit on the machine and adjust the pad to upper back height.
2. Extend your torso backward against resistance.
3. Return slowly to the starting position.`,
      instruction_fa: `
۱. روی دستگاه نشسته و پد را روی قسمت بالایی پشت تنظیم کنید.
۲. بدن را به عقب فشار دهید تا مقاومت ایجاد شود.
۳. به‌آرامی به حالت شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Ball Slam',
      name_fa: 'ضربه توپ',
      slug: createSlug('Ball Slam'),
      instruction_en: `
1. Hold the medicine ball overhead.
2. Slam it down forcefully while engaging your core.
3. Pick it up and repeat.`,
      instruction_fa: `
۱. توپ را بالای سر نگه دارید.
۲. توپ را با قدرت به زمین بکوبید و عضلات شکم را درگیر کنید.
۳. توپ را برداشته و تکرار کنید.`,
      equipment: EquipmentType.MEDICINE_BALL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Band Pull Apart',
      name_fa: 'کشش کش به طرفین',
      slug: createSlug('Band Pull Apart'),
      instruction_en: `
1. Hold a resistance band at shoulder height.
2. Pull the band apart by squeezing your shoulder blades.
3. Return slowly to the starting position.`,
      instruction_fa: `
۱. کش را در ارتفاع شانه گرفته و دست‌ها را صاف نگه دارید.
۲. با عقب بردن شانه‌ها، کش را به طرفین بکشید.
۳. به حالت شروع بازگردید.`,
      equipment: EquipmentType.BAND,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Battle Ropes',
      name_fa: 'تمرین با طناب',
      slug: createSlug('Battle Ropes'),
      instruction_en: `
1. Hold one rope end in each hand.
2. Move your arms explosively to create waves.
3. Maintain core tension throughout.`,
      instruction_fa: `
۱. انتهای طناب‌ها را با دست بگیرید.
۲. دست‌ها را سریع بالا و پایین حرکت دهید تا موج ایجاد شود.
۳. عضلات شکم را درگیر نگه دارید.`,
      equipment: EquipmentType.OTHER,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Bench Dip',
      name_fa: 'دیپ با نیمکت',
      slug: createSlug('Bench Dip'),
      instruction_en: `
1. Place hands on the bench behind you.
2. Lower yourself by bending your elbows.
3. Press back up to the starting position.`,
      instruction_fa: `
۱. دست‌ها را پشت بدن روی نیمکت قرار دهید.
۲. با خم کردن آرنج پایین بیایید.
۳. با فشار دادن، به بالا بازگردید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.TRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Bench Press (Barbell)',
      name_fa: 'پرس سینه با هالتر',
      slug: createSlug('Bench Press Barbell'),
      instruction_en: `
1. Lie on the bench and grip the bar slightly wider than shoulder width.
2. Lower the bar to your chest under control.
3. Press back up until your arms are extended.`,
      instruction_fa: `
۱. روی نیمکت دراز کشیده و هالتر را کمی بازتر از عرض شانه بگیرید.
۲. هالتر را کنترل‌شده به سمت سینه پایین بیاورید.
۳. هالتر را دوباره به سمت بالا فشار دهید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Bench Press (Cable)',
      name_fa: 'پرس سینه با سیم‌کش',
      slug: createSlug('Bench Press Cable'),
      instruction_en: `
1. Set the cable pulleys at chest height and attach handles.
2. Hold the handles and step forward to create tension.
3. Press the handles forward until your arms are extended.
4. Slowly return to the starting position.`,
      instruction_fa: `
۱. سیم‌کش‌ها را در ارتفاع سینه تنظیم کرده و دسته‌ها را وصل کنید.
۲. دسته‌ها را گرفته و کمی به جلو بروید تا کشش ایجاد شود.
۳. دسته‌ها را به سمت جلو فشار دهید تا دست‌ها صاف شوند.
۴. به‌آرامی به حالت شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Bench Press (Dumbbell)',
      name_fa: 'پرس سینه با دمبل',
      slug: createSlug('Bench Press Dumbbell'),
      instruction_en: `
1. Lie on a flat bench holding a dumbbell in each hand at chest level.
2. Press the dumbbells upward until arms are fully extended.
3. Lower them slowly back to chest level.`,
      instruction_fa: `
۱. روی نیمکت صاف دراز کشیده و دمبل‌ها را در سطح سینه نگه دارید.
۲. دمبل‌ها را به سمت بالا فشار دهید تا دست‌ها کاملاً صاف شوند.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Bench Press (Smith Machine)',
      name_fa: 'پرس سینه با دستگاه اسمیت',
      slug: createSlug('Bench Press Smith Machine'),
      instruction_en: `
1. Position a flat bench under the Smith machine bar.
2. Grip the bar slightly wider than shoulder width.
3. Lower the bar to your chest, then press it back up to the top.`,
      instruction_fa: `
۱. نیمکت را زیر دستگاه اسمیت قرار دهید.
۲. هالتر را کمی بازتر از عرض شانه بگیرید.
۳. هالتر را به سمت سینه پایین آورده و دوباره به بالا فشار دهید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Bench Press - Close Grip (Barbell)',
      name_fa: 'پرس سینه با هالتر - دست جمع',
      slug: createSlug('Bench Press Close Grip Barbell'),
      instruction_en: `
1. Lie on a flat bench and grip the barbell with hands shoulder-width apart.
2. Lower the bar to your mid-chest while keeping elbows close to your body.
3. Press the bar up until arms are fully extended.`,
      instruction_fa: `
۱. روی نیمکت دراز بکشید و هالتر را به اندازه عرض شانه بگیرید.
۲. هالتر را تا وسط سینه پایین بیاورید و آرنج‌ها را نزدیک بدن نگه دارید.
۳. هالتر را بالا ببرید تا دست‌ها صاف شوند.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.TRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Bench Press - Wide Grip (Barbell)',
      name_fa: 'پرس سینه با هالتر - دست باز',
      slug: createSlug('Bench Press Wide Grip Barbell'),
      instruction_en: `
1. Lie on a flat bench and grip the bar wider than shoulder width.
2. Lower the bar to your chest slowly.
3. Press it back up, focusing on chest contraction.`,
      instruction_fa: `
۱. روی نیمکت دراز بکشید و هالتر را بازتر از عرض شانه بگیرید.
۲. هالتر را به‌آرامی به سمت سینه پایین بیاورید.
۳. هالتر را دوباره بالا برده و روی انقباض سینه تمرکز کنید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Bent Over One Arm Row (Dumbbell)',
      name_fa: 'قایقی تک دست با دمبل',
      slug: createSlug('Bent Over One Arm Row Dumbbell'),
      instruction_en: `
1. Place one knee and hand on a bench for support.
2. Hold a dumbbell in the opposite hand.
3. Pull the dumbbell toward your waist, keeping your back flat.
4. Lower it slowly and repeat.`,
      instruction_fa: `
۱. یک زانو و یک دست را روی نیمکت قرار دهید.
۲. دمبل را در دست مخالف بگیرید.
۳. دمبل را به سمت کمر بالا بیاورید و پشت را صاف نگه دارید.
۴. به‌آرامی دمبل را پایین آورده و تکرار کنید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Bent Over Row (Band)',
      name_fa: 'قایقی با کش',
      slug: createSlug('Bent Over Row Band'),
      instruction_en: `
1. Stand on a resistance band with both feet shoulder-width apart.
2. Bend forward slightly with a straight back.
3. Pull the band handles toward your waist.
4. Lower them slowly back to the starting position.`,
      instruction_fa: `
۱. روی کش بایستید و پاها را به اندازه عرض شانه باز کنید.
۲. کمی به جلو خم شوید و پشت را صاف نگه دارید.
۳. دسته‌های کش را به سمت کمر بکشید.
۴. به‌آرامی به حالت شروع بازگردید.`,
      equipment: EquipmentType.BAND,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Bent Over Row (Barbell)',
      name_fa: 'قایقی با هالتر',
      slug: createSlug('Bent Over Row Barbell'),
      instruction_en: `
1. Hold a barbell with an overhand grip and bend forward at the hips.
2. Keep your back straight and knees slightly bent.
3. Pull the bar toward your lower chest.
4. Lower it back under control.`,
      instruction_fa: `
۱. هالتر را با دست‌های باز گرفته و از کمر به جلو خم شوید.
۲. پشت را صاف و زانوها را کمی خم نگه دارید.
۳. هالتر را به سمت پایین سینه بکشید.
۴. هالتر را کنترل‌شده پایین بیاورید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Bent Over Row (Dumbbell)',
      name_fa: 'قایقی با دمبل',
      slug: createSlug('Bent Over Row Dumbbell'),
      instruction_en: `
1. Hold a dumbbell in each hand with a neutral grip.
2. Bend forward slightly, keeping your back flat.
3. Pull both dumbbells toward your waist.
4. Lower them slowly and repeat.`,
      instruction_fa: `
۱. دمبل‌ها را با هر دو دست و کف دست‌ها روبه‌هم بگیرید.
۲. کمی به جلو خم شوید و پشت را صاف نگه دارید.
۳. دمبل‌ها را به سمت کمر بکشید.
۴. به‌آرامی پایین آورده و تکرار کنید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Bent Over Row - Underhand (Barbell)',
      name_fa: 'قایقی با هالتر - گیرش زیر دست',
      slug: createSlug('Bent Over Row Underhand Barbell'),
      instruction_en: `
1. Hold the barbell with an underhand (palms-up) grip.
2. Bend forward at the hips with a straight back.
3. Pull the bar toward your waist.
4. Lower it slowly back down.`,
      instruction_fa: `
۱. هالتر را با گیرش زیر دست (کف دست‌ها به بالا) بگیرید.
۲. از کمر به جلو خم شوید و پشت را صاف نگه دارید.
۳. هالتر را به سمت کمر بالا بیاورید.
۴. به‌آرامی پایین آورده و تکرار کنید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Bicep Curl (Barbell)',
      name_fa: 'جلوبازو با هالتر',
      slug: createSlug('Bicep Curl (Barbell)'),
      instruction_en: `
1. Stand with feet shoulder-width apart and hold a barbell with an underhand grip.
2. Keep elbows close to your torso and curl the bar upward.
3. Squeeze the biceps at the top, avoiding swinging your body.
4. Slowly lower the bar back to the starting position.`,
      instruction_fa: `
۱. صاف بایستید و هالتر را با گرفتن زیر دست نگه دارید.
۲. آرنج‌ها را نزدیک بدن نگه داشته و هالتر را به سمت بالا جلوبازو کنید.
۳. در بالاترین نقطه مکث و انقباض ایجاد کنید.
۴. به‌آرامی هالتر را پایین بیاورید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Bicep Curl (Cable)',
      name_fa: 'جلوبازو سیم‌کش',
      slug: createSlug('Bicep Curl (Cable)'),
      instruction_en: `
1. Stand facing the cable machine and grab the straight bar attachment.
2. Keep elbows fixed by your sides and curl the bar upward.
3. Squeeze the biceps at the top.
4. Lower with control and repeat.`,
      instruction_fa: `
۱. روبروی دستگاه سیم‌کش بایستید و میله را بگیرید.
۲. آرنج‌ها را ثابت نگه داشته و جلوبازو کنید.
۳. در بالاترین نقطه مکث کنید.
۴. با کنترل به پایین برگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Bicep Curl (Dumbbell)',
      name_fa: 'جلوبازو با دمبل',
      slug: createSlug('Bicep Curl (Dumbbell)'),
      instruction_en: `
1. Stand with dumbbells in both hands, palms facing forward.
2. Curl the dumbbells upward while keeping elbows close to the body.
3. Pause and squeeze at the top.
4. Lower the dumbbells slowly.`,
      instruction_fa: `
۱. دمبل‌ها را در دو دست گرفته و کف دست‌ها رو به جلو باشد.
۲. آرنج‌ها را ثابت نگه داشته و دمبل‌ها را به سمت بالا جلوبازو کنید.
۳. در بالاترین نقطه مکث کنید.
۴. به‌آرامی پایین ببرید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Bicep Curl (Machine)',
      name_fa: 'جلوبازو دستگاه',
      slug: createSlug('Bicep Curl (Machine)'),
      instruction_en: `
1. Sit on the machine and place your upper arms on the pad.
2. Hold the handles and curl upward.
3. Squeeze the biceps at the top.
4. Slowly return to the starting position.`,
      instruction_fa: `
۱. روی دستگاه بنشینید و بازوها را روی پَد قرار دهید.
۲. دستگیره‌ها را گرفته و جلوبازو کنید.
۳. در بالاترین نقطه مکث کنید.
۴. به‌آرامی به وضعیت شروع برگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Bicycle Crunch',
      name_fa: 'کرانچ دوچرخه‌ای',
      slug: createSlug('Bicycle Crunch'),
      instruction_en: `
1. Lie on your back with hands behind your head.
2. Lift your legs and move in a pedaling motion.
3. Touch your opposite elbow to the opposite knee.
4. Alternate sides with controlled movement.`,
      instruction_fa: `
۱. به پشت بخوابید و دست‌ها را پشت سر قرار دهید.
۲. پاها را بالا آورده و حرکت پدال زدن انجام دهید.
۳. آرنج را به زانوی مخالف نزدیک کنید.
۴. طرفین را به‌صورت کنترل‌شده عوض کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.ABS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Bird Dog',
      name_fa: 'برد داگ (دست و پای مخالف)',
      slug: createSlug('Bird Dog'),
      instruction_en: `
1. Start on hands and knees.
2. Extend one arm forward and the opposite leg backward.
3. Hold briefly and return to starting position.
4. Switch sides and repeat.`,
      instruction_fa: `
۱. روی دست و زانو قرار بگیرید.
۲. یک دست را جلو و پای مخالف را عقب ببرید.
۳. کمی مکث کنید و سپس به حالت شروع برگردید.
۴. طرفین را عوض کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CORE,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Box Jump',
      name_fa: 'پرش روی جعبه',
      slug: createSlug('Box Jump'),
      instruction_en: `
1. Stand in front of a box or platform.
2. Bend your knees and swing your arms.
3. Explosively jump and land softly on the box.
4. Step down and repeat.`,
      instruction_fa: `
۱. روبروی باکس بایستید.
۲. زانوها را خم کنید و دست‌ها را تاب دهید.
۳. پرش انفجاری انجام دهید و نرم روی باکس فرود بیایید.
۴. پایین بیایید و تکرار کنید.`,
      equipment: EquipmentType.OTHER,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Box Squat (Barbell)',
      name_fa: 'اسکات باکس با هالتر',
      slug: createSlug('Box Squat (Barbell)'),
      instruction_en: `
1. Place a box behind you and unrack the barbell.
2. Sit back and lower yourself until seated on the box.
3. Drive through your heels and stand back up.`,
      instruction_fa: `
۱. باکس را پشت خود قرار دهید و هالتر را بردارید.
۲. بنشینید تا روی باکس قرار بگیرید.
۳. از پاشنه‌ها نیرو بزنید و دوباره بایستید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Bulgarian Split Squat',
      name_fa: 'اسپلیت اسکات بلغاری',
      slug: createSlug('Bulgarian Split Squat'),
      instruction_en: `
1. Place your rear foot on a bench behind you.
2. Bend your front leg and lower your body.
3. Push through the front heel to return to standing.`,
      instruction_fa: `
۱. پای عقب را روی نیمکت قرار دهید.
۲. زانوی جلو را خم کرده و پایین بروید.
۳. از پاشنه پای جلو نیرو بزنید و بلند شوید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Burpee',
      name_fa: 'برپی',
      slug: createSlug('Burpee'),
      instruction_en: `
1. Stand straight and squat down placing hands on the ground.
2. Kick feet back into a plank position.
3. Perform a push-up.
4. Jump feet back to squat position and explosively jump upward.`,
      instruction_fa: `
۱. صاف بایستید و به حالت اسکوات پایین بروید و دست‌ها را روی زمین بگذارید.
۲. پاها را به عقب پرتاب کنید و در حالت پلانک قرار بگیرید.
۳. یک شنا انجام دهید.
۴. پاها را نزدیک دست آورده و با پرش بلند شوید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Cable Crossover',
      name_fa: 'کابل کراس‌اوور',
      slug: createSlug('Cable Crossover'),
      instruction_en: `
1. Set both pulleys above shoulder height.
2. Grab the handles and step forward to create tension.
3. With elbows slightly bent, pull the handles toward the front of your body until hands meet.
4. Slowly return to the starting position.`,
      instruction_fa: `
۱. دو سیم‌کش را بالاتر از سطح شانه تنظیم کنید.
۲. دسته‌ها را گرفته و کمی به جلو بروید تا کشش ایجاد شود.
۳. با کمی خمیدگی در آرنج، دسته‌ها را به سمت جلو بیاورید تا در مقابل بدن به هم برسند.
۴. به‌آرامی به حالت شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Cable Crunch',
      name_fa: 'کرانچ با سیم‌کش',
      slug: createSlug('Cable Crunch'),
      instruction_en: `
1. Kneel in front of the high pulley with a rope attachment.
2. Hold the rope near your ears.
3. Crunch down by flexing your spine and bringing your elbows toward your knees.
4. Slowly return to the starting position.`,
      instruction_fa: `
۱. در مقابل سیم‌کش از بالا زانو بزنید و طناب را بگیرید.
۲. طناب را نزدیک گوش‌ها نگه دارید.
۳. با جمع کردن شکم، آرنج‌ها را به سمت زانوها پایین بیاورید.
۴. به‌آرامی به حالت شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.ABS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Cable Kickback',
      name_fa: 'کیک‌بک باسن با سیم‌کش',
      slug: createSlug('Cable Kickback'),
      instruction_en: `
1. Attach an ankle strap to the low pulley.
2. Stand holding the machine for balance.
3. Extend your leg backward while keeping your torso still.
4. Squeeze the glutes and return slowly.`,
      instruction_fa: `
۱. مچ‌بند پا را به سیم‌کش پایین وصل کنید.
۲. برای حفظ تعادل، دستگاه را نگه دارید.
۳. پا را به سمت عقب باز کنید بدون اینکه تنه حرکت کند.
۴. باسن را منقبض کرده و به‌آرامی بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.GLUTES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Cable Pull Through',
      name_fa: 'پول‌ترو با سیم‌کش',
      slug: createSlug('Cable Pull Through'),
      instruction_en: `
1. Attach the rope to the low pulley and face away from it.
2. Bend at the hips while keeping your back neutral.
3. Push your hips forward and stand tall while squeezing your glutes.
4. Return with control to the starting position.`,
      instruction_fa: `
۱. طناب را به سیم‌کش پایین وصل کرده و پشت به دستگاه قرار بگیرید.
۲. باسن را به عقب داده و خم شوید، کمر صاف باشد.
۳. باسن را جلو دهید و بدن را صاف کنید، باسن را منقبض کنید.
۴. با کنترل به حالت شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.HAMSTRINGS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Cable Twist',
      name_fa: 'چرخش سیم‌کش',
      slug: createSlug('Cable Twist'),
      instruction_en: `
1. Adjust the cable to chest height.
2. Hold the handle with both hands, standing sideways to the machine.
3. Rotate your torso away from the machine.
4. Slowly return to the starting position.`,
      instruction_fa: `
۱. ارتفاع سیم‌کش را در سطح سینه تنظیم کنید.
۲. دسته را با هر دو دست گرفته و پهلو به دستگاه بایستید.
۳. تنه را از دستگاه دور بچرخانید.
۴. به‌آرامی به حالت شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.CORE,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Calf Press on Leg Press',
      name_fa: 'ساق پا روی دستگاه پرس پا',
      slug: createSlug('Calf Press Leg Press'),
      instruction_en: `
1. Sit on the leg press machine and place your toes on the bottom edge of the platform.
2. Push using your calves to extend your ankles.
3. Slowly lower to a full stretch.`,
      instruction_fa: `
۱. روی دستگاه پرس پا بنشینید و پنجه‌های پا را روی لبه پایین صفحه قرار دهید.
۲. با فشار ساق پا، مچ‌ها را باز کنید.
۳. به‌آرامی پایین بروید تا کشش کامل ایجاد شود.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.CALVES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Calf Press on Seated Leg Press',
      name_fa: 'ساق پا روی پرس پا نشسته',
      slug: createSlug('Calf Press Seated Leg Press'),
      instruction_en: `
1. Sit on the seated leg press machine.
2. Place the balls of your feet on the platform with heels hanging off.
3. Press using only your calves.
4. Lower slowly to stretch.`,
      instruction_fa: `
۱. روی دستگاه پرس پا نشسته قرار بگیرید.
۲. پنجه پا را روی صفحه قرار دهید و پاشنه‌ها بیرون بمانند.
۳. فقط با ساق پا فشار وارد کنید.
۴. به‌آرامی پایین بیایید و کشش را برقرار کنید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.CALVES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Cat-Cow Stretch',
      name_fa: 'حرکت کششی گربه-گاو',
      slug: createSlug('Cat Cow Stretch'),
      instruction_en: `
1. Start on your hands and knees.
2. Arch your back downward while lifting your head (Cow position).
3. Round your back upward while lowering your head (Cat position).
4. Repeat in a slow and controlled motion.`,
      instruction_fa: `
۱. روی دست‌ها و زانوها قرار بگیرید.
۲. کمر را به پایین قوس دهید و سر را بالا ببرید (حالت گاو).
۳. کمر را گرد کرده و سر را پایین بیاورید (حالت گربه).
۴. به‌آرامی تکرار کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CORE,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Chest Dip',
      name_fa: 'دیپ سینه',
      slug: createSlug('Chest Dip'),
      instruction_en: `
1. Grip parallel bars and lift your body.
2. Lean forward slightly.
3. Lower your body until you feel chest engagement.
4. Push back to the starting position.`,
      instruction_fa: `
۱. میله‌های موازی را گرفته و بدن را بالا ببرید.
۲. کمی به جلو خم شوید.
۳. بدن را پایین بیاورید تا عضلات سینه درگیر شوند.
۴. دوباره به حالت شروع برگردید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Chest Fly (Cable)',
      name_fa: 'فلای سینه با سیم‌کش',
      slug: createSlug('Chest Fly Cable'),
      instruction_en: `
1. Set the pulleys slightly below shoulder height.
2. Hold both handles with elbows slightly bent.
3. Bring arms together in front of your chest.
4. Slowly return and control the weight.`,
      instruction_fa: `
۱. سیم‌کش‌ها را کمی پایین‌تر از سطح شانه تنظیم کنید.
۲. دسته‌ها را با آرنج کمی خم گرفته و ثابت بایستید.
۳. دست‌ها را در مقابل سینه به هم نزدیک کنید.
۴. به‌آرامی و با کنترل بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Chest Fly (Band)',
      name_fa: 'فلای سینه با کش',
      slug: createSlug('Chest Fly Band'),
      instruction_en: `
1. Anchor the resistance band behind you at chest height.
2. Hold the handles with elbows slightly bent.
3. Bring your hands together in front of your chest.
4. Slowly return to the starting position.`,
      instruction_fa: `
۱. کش را در سطح سینه پشت سر خود ثابت کنید.
۲. دسته‌ها را گرفته و آرنج‌ها را کمی خم نگه دارید.
۳. دست‌ها را در مقابل سینه به هم نزدیک کنید.
۴. به‌آرامی به حالت شروع بازگردید.`,
      equipment: EquipmentType.BAND,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Chest Fly (Dumbbell)',
      name_fa: 'فلای سینه با دمبل',
      slug: createSlug('Chest Fly Dumbbell'),
      instruction_en: `
1. Lie on a bench holding dumbbells with arms slightly bent.
2. Open your arms to the sides in a wide arc.
3. Bring the dumbbells together above your chest.
4. Control the movement on the way down.`,
      instruction_fa: `
۱. روی نیمکت دراز بکشید و دمبل‌ها را با آرنج کمی خم نگه دارید.
۲. دست‌ها را به‌صورت قوس به طرفین باز کنید.
۳. دمبل‌ها را بالای سینه نزدیک کنید.
۴. حرکت را با کنترل به سمت پایین برگردانید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Chest Press (Band)',
      name_fa: 'پرس سینه با کش',
      slug: createSlug('Chest Press Band'),
      instruction_en: `
1. Anchor the band behind you at chest height.
2. Hold the handles and step forward to create tension.
3. Press forward until arms are extended.
4. Slowly return with control.`,
      instruction_fa: `
۱. کش را در سطح سینه پشت سر خود وصل کنید.
۲. دسته‌ها را گرفته و کمی به جلو بروید تا کشش ایجاد شود.
۳. دست‌ها را به سمت جلو فشار دهید تا کاملاً صاف شوند.
۴. به‌آرامی با کنترل حرکت بازگردید.`,
      equipment: EquipmentType.BAND,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Chest Press (Machine)',
      name_fa: 'پرس سینه با دستگاه',
      slug: createSlug('Chest Press Machine'),
      instruction_en: `
1. Sit on the chest press machine and adjust the handles to chest height.
2. Push the handles forward until your arms are straight.
3. Slowly return while keeping tension on your chest.`,
      instruction_fa: `
۱. روی دستگاه پرس سینه بنشینید و دسته‌ها را در سطح سینه تنظیم کنید.
۲. دسته‌ها را به سمت جلو فشار دهید تا دست‌ها صاف شوند.
۳. با حفظ فشار روی سینه به‌آرامی بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Chin Tucks',
      name_fa: 'چین تاک (عقب‌بردن چانه)',
      slug: createSlug('Chin Tucks'),
      instruction_en: `
1. Sit or stand tall.
2. Pull your chin straight back without tilting your head.
3. Hold briefly, keeping your neck long.
4. Release and repeat.`,
      instruction_fa: `
۱. صاف بنشینید یا بایستید.
۲. چانه را بدون خم کردن سر مستقیم به عقب ببرید.
۳. چند لحظه نگه دارید و گردن را کشیده نگه دارید.
۴. رها کرده و تکرار کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.NECK,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Chin Up',
      name_fa: 'چین‌آپ (بارفیکس جمع)',
      slug: createSlug('Chin Up'),
      instruction_en: `
1. Grab the bar shoulder-width apart with palms facing you.
2. Pull your chin over the bar by engaging your back and biceps.
3. Lower slowly with control.`,
      instruction_fa: `
۱. میله را به عرض شانه و با کف دست رو به خود بگیرید.
۲. خود را بالا بکشید تا چانه به بالای میله برسد.
۳. با کنترل به‌آرامی پایین بیایید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Chin Up (Assisted)',
      name_fa: 'چین‌آپ کمکی',
      slug: createSlug('Chin Up Assisted'),
      instruction_en: `
1. Use resistance bands or an assisted pull-up machine.
2. Pull up until your chin passes the bar.
3. Lower slowly with control.`,
      instruction_fa: `
۱. از کش کمک‌حرکت یا دستگاه بارفیکس کمکی استفاده کنید.
۲. خود را بالا بکشید تا چانه از میله عبور کند.
۳. با کنترل به‌آرامی پایین بیایید.`,
      equipment: EquipmentType.ASSISTED_BODY_WEIGHT,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Clean (Barbell)',
      name_fa: 'کلین با هالتر',
      slug: createSlug('Clean Barbell'),
      instruction_en: `
1. Start with the barbell over your mid-foot.
2. Explosively pull the bar upward using hips and legs.
3. Catch the bar in a front-rack position.
4. Stand tall to finish.`,
      instruction_fa: `
۱. هالتر را بالای وسط پا قرار دهید.
۲. با قدرت از باسن و پاها هالتر را بالا بکشید.
۳. هالتر را روی شانه‌ها (فرانت رک) بگیرید.
۴. صاف بایستید تا حرکت کامل شود.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Clean and Jerk (Barbell)',
      name_fa: 'کلین و جرک با هالتر',
      slug: createSlug('Clean and Jerk Barbell'),
      instruction_en: `
1. Perform a clean to bring the bar to the front rack position.
2. Dip slightly and drive the bar overhead.
3. Lock arms fully and stabilize before lowering.`,
      instruction_fa: `
۱. حرکت کلین را انجام دهید تا هالتر روی شانه‌ها قرار گیرد.
۲. کمی پایین بروید و هالتر را به بالای سر پرس کنید.
۳. دست‌ها را کاملاً صاف کرده و سپس با کنترل پایین بیاورید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.EXPERT,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Climbing',
      name_fa: 'کوهنوردی / صخره‌نوردی',
      slug: createSlug('Climbing'),
      instruction_en: `
1. Move upward using coordinated arm and leg movement.
2. Maintain balance and control your breathing.
3. Keep your core tight and use legs instead of relying only on arms.`,
      instruction_fa: `
۱. با حرکت هماهنگ دست‌ها و پاها از سطح بالا بروید.
۲. تعادل خود را حفظ کرده و تنفس را کنترل کنید.
۳. از پاها بیشتر از دست‌ها برای بالا رفتن استفاده کنید.`,
      equipment: EquipmentType.OTHER,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Concentration Curl (Dumbbell)',
      name_fa: 'جلو بازو تمرکزی با دمبل',
      slug: createSlug('Concentration Curl Dumbbell'),
      instruction_en: `
1. Sit on a bench and lean forward slightly.
2. Place your elbow on the inside of your thigh.
3. Curl the dumbbell upward while squeezing the biceps.
4. Lower slowly with control.`,
      instruction_fa: `
۱. روی نیمکت بنشینید و کمی به جلو خم شوید.
۲. آرنج را داخل ران قرار دهید.
۳. دمبل را بالا بیاورید و عضله جلو بازو را منقبض کنید.
۴. با کنترل به سمت پایین بازگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Cross Body Crunch',
      name_fa: 'کرانچ مورب',
      slug: createSlug('Cross Body Crunch'),
      instruction_en: `
1. Lie on your back with knees bent.
2. Lift your upper body and rotate, bringing elbow to opposite knee.
3. Lower and repeat on the other side.`,
      instruction_fa: `
۱. روی زمین دراز بکشید و زانوها را خم کنید.
۲. بالاتنه را بالا بیاورید و آرنج را به زانوی مخالف برسانید.
۳. پایین آمده و دوباره برای سمت دیگر تکرار کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.ABS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Crunch',
      name_fa: 'کرانچ',
      slug: createSlug('Crunch'),
      instruction_en: `
1. Lie on your back with knees bent.
2. Lift your shoulders off the floor while squeezing your abs.
3. Slowly lower without relaxing your core.`,
      instruction_fa: `
۱. روی پشت دراز بکشید و زانوها را خم کنید.
۲. شانه‌ها را از زمین بلند کنید و شکم را منقبض کنید.
۳. بدون رها کردن فشار، به‌آرامی به حالت شروع بازگردید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.ABS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Crunch (Machine)',
      name_fa: 'کرانچ با دستگاه',
      slug: createSlug('Crunch Machine'),
      instruction_en: `
1. Sit on the machine and adjust seat height.
2. Hold the handles and contract your abs to pull forward.
3. Return slowly with control.`,
      instruction_fa: `
۱. روی دستگاه بنشینید و ارتفاع صندلی را تنظیم کنید.
۲. دسته‌ها را گرفته و با منقبض کردن شکم به جلو بکشید.
۳. با کنترل به حالت شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.ABS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Cycling',
      name_fa: 'دوچرخه‌سواری',
      slug: createSlug('Cycling'),
      instruction_en: `
1. Sit on the bike seat and grab the handlebars.
2. Pedal at a steady pace, keeping your back straight.
3. Maintain breathing and adjust resistance if available.`,
      instruction_fa: `
۱. روی زین دوچرخه بنشینید و دسته‌ها را بگیرید.
۲. با ریتم ثابت پدال بزنید و کمر را صاف نگه دارید.
۳. تنفس را کنترل کنید و در صورت امکان مقاومت را تنظیم کنید.`,
      equipment: EquipmentType.OTHER,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Deadlift (Band)',
      name_fa: 'ددلیفت با کش',
      slug: createSlug('Deadlift Band'),
      instruction_en: `
1. Stand on the band with feet shoulder-width apart.
2. Hold the band handles or ends with both hands.
3. Push hips back and lower your torso slightly.
4. Stand back up while squeezing glutes.`,
      instruction_fa: `
۱. روی کش بایستید و پاها را به اندازه عرض شانه باز کنید.
۲. دسته‌ها یا انتهای کش را با هر دو دست بگیرید.
۳. باسن را عقب داده و کمی پایین بروید.
۴. با منقبض کردن باسن بایستید.`,
      equipment: EquipmentType.BAND,
      muscle_group: MuscleGroup.GLUTES,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Deadlift (Barbell)',
      name_fa: 'ددلیفت با هالتر',
      slug: createSlug('Deadlift Barbell'),
      instruction_en: `
1. Stand with the bar over mid-foot.
2. Bend at the hips and grip the bar.
3. Drive through your heels to stand tall.
4. Lower the bar by pushing hips back.`,
      instruction_fa: `
۱. طوری قرار بگیرید که هالتر بالای وسط پا باشد.
۲. از باسن خم شوید و هالتر را بگیرید.
۳. با فشار از پاشنه‌ها بلند شوید و صاف بایستید.
۴. با عقب دادن باسن هالتر را پایین بیاورید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.GLUTES,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Deadlift (Dumbbell)',
      name_fa: 'ددلیفت با دمبل',
      slug: createSlug('Deadlift Dumbbell'),
      instruction_en: `
1. Hold dumbbells at your sides.
2. Push hips back and hinge forward.
3. Stand tall while contracting glutes.`,
      instruction_fa: `
۱. دمبل‌ها را در کنار بدن نگه دارید.
۲. باسن را عقب داده و به جلو خم شوید.
۳. با منقبض کردن باسن صاف بایستید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.GLUTES,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Deadlift (Smith Machine)',
      name_fa: 'ددلیفت با اسمیت',
      slug: createSlug('Deadlift Smith Machine'),
      instruction_en: `
1. Stand with shins close to the bar on a Smith machine.
2. Push hips back and grab the bar.
3. Stand up tall while keeping the bar close to your body.`,
      instruction_fa: `
۱. نزدیک میله دستگاه اسمیت بایستید.
۲. باسن را عقب داده و میله را بگیرید.
۳. با نگه داشتن میله نزدیک بدن صاف بایستید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.GLUTES,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Deadlift High Pull (Barbell)',
      name_fa: 'ددلیفت های پول با هالتر',
      slug: createSlug('Deadlift High Pull Barbell'),
      instruction_en: `
1. Begin the deadlift by pulling the bar upward explosively.
2. As it reaches hip level, continue pulling upward with elbows high.
3. Lower under control and repeat.`,
      instruction_fa: `
۱. حرکت را مانند ددلیفت شروع کنید و هالتر را انفجاری بالا بکشید.
۲. وقتی به سطح لگن رسید، با بالا آوردن آرنج‌ها هالتر را بالاتر ببرید.
۳. با کنترل پایین آورده و تکرار کنید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Floor Press (Barbell)',
      name_fa: 'پرس سینه روی زمین (هالتر)',
      slug: createSlug('Floor Press Barbell'),
      instruction_en: `
1. Lie on the floor, holding the barbell with a shoulder-width grip.
2. Lower the barbell until elbows touch the floor.
3. Press upward until arms are extended.
4. Repeat.`,
      instruction_fa: `
۱. روی زمین دراز بکشید و هالتر را به عرض شانه بگیرید.
۲. هالتر را پایین بیاورید تا آرنج‌ها با زمین تماس پیدا کنند.
۳. هالتر را پرس کنید تا دست‌ها صاف شوند.
۴. تکرار کنید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Front Raise (Band)',
      name_fa: 'جلو بازو دمبل — جلو بازو با مقاومت کشی',
      slug: createSlug('Front Raise Band'),
      instruction_en: `
1. Stand on the band and hold the handles.
2. Lift arms forward until parallel to the floor.
3. Lower slowly back down.
4. Repeat.`,
      instruction_fa: `
۱. روی کش بایستید و دسته‌ها را در دست بگیرید.
۲. دست‌ها را تا ارتفاع شانه بالا بیاورید.
۳. آرام به پایین برگردید.
۴. تکرار کنید.`,
      equipment: EquipmentType.RESISTANCE_BAND,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Front Raise (Barbell)',
      name_fa: 'جلو بازو با هالتر (جلو بازو هالتر)',
      slug: createSlug('Front Raise Barbell'),
      instruction_en: `
1. Hold a barbell with an overhand grip.
2. Raise the bar in front of you until shoulder height.
3. Lower slowly with control.
4. Repeat.`,
      instruction_fa: `
۱. هالتر را با دستگیره رو به پایین بگیرید.
۲. هالتر را تا ارتفاع شانه بالا بیاورید.
۳. با کنترل پایین بیاورید.
۴. تکرار کنید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Front Raise (Cable)',
      name_fa: 'جلو بازو با سیم‌کش',
      slug: createSlug('Front Raise Cable'),
      instruction_en: `
1. Attach a single handle to the low pulley.
2. Raise arm forward to shoulder height.
3. Lower slowly without swinging.
4. Repeat.`,
      instruction_fa: `
۱. دسته سیم‌کش را در پایین دستگاه وصل کنید.
۲. دست را تا ارتفاع شانه بالا بیاورید.
۳. بدون تاب دادن پایین بیاورید.
۴. تکرار کنید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Front Raise (Dumbbell)',
      name_fa: 'جلو بازو (دمبل)',
      slug: createSlug('Front Raise Dumbbell'),
      instruction_en: `
1. Hold dumbbells by your sides.
2. Raise arms straight forward to shoulder level.
3. Lower slowly with control.
4. Repeat.`,
      instruction_fa: `
۱. دمبل‌ها را کنار بدن نگه دارید.
۲. دست‌ها را تا ارتفاع شانه بالا بیاورید.
۳. با کنترل پایین بیاورید.
۴. تکرار کنید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Front Raise (Plate)',
      name_fa: 'جلو بازو با صفحه وزنه',
      slug: createSlug('Front Raise Plate'),
      instruction_en: `
1. Hold a weight plate with both hands.
2. Raise arms forward to shoulder height.
3. Lower with control.
4. Repeat.`,
      instruction_fa: `
۱. صفحه وزنه را با هر دو دست بگیرید.
۲. آن را تا ارتفاع شانه بالا بیاورید.
۳. با کنترل پایین بیاورید.
۴. تکرار کنید.`,
      equipment: EquipmentType.OTHER,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Front Squat (Barbell)',
      name_fa: 'اسکوات جلو (هالتر)',
      slug: createSlug('Front Squat Barbell'),
      instruction_en: `
1. Rest barbell on front shoulders and cross or rack your arms.
2. Squat down by bending hips and knees.
3. Push through heels to stand back up.
4. Repeat.`,
      instruction_fa: `
۱. هالتر را روی جلوی شانه‌ها قرار دهید و دست‌ها را روی آن قفل کنید.
۲. با خم کردن زانو و باسن به پایین اسکوات بروید.
۳. با فشار پاشنه‌ها به بالا برگردید.
۴. تکرار کنید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.QUADRICEPS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Glute Ham Raise',
      name_fa: 'بلند کردن باسن روی دستگاه (Glute Ham Raise)',
      slug: createSlug('Glute Ham Raise'),
      instruction_en: `
1. Anchor legs on the machine and start in a straight body line.
2. Lower torso forward while keeping core tight.
3. Raise torso back up using hamstrings and glutes.
4. Repeat.`,
      instruction_fa: `
۱. پاها را روی دستگاه محکم کنید و بدن را صاف نگه دارید.
۲. بالاتنه را کنترل شده پایین بیاورید.
۳. با درگیری باسن و پشت پا به بالا برگردید.
۴. تکرار کنید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.HAMSTRINGS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Glute Kickback (Machine)',
      name_fa: 'کیک‌بک باسن (دستگاه)',
      slug: createSlug('Glute Kickback Machine'),
      instruction_en: `
1. Place foot on machine pad.
2. Push backward by squeezing glutes.
3. Slowly return to starting position.
4. Repeat.`,
      instruction_fa: `
۱. پا را روی پد دستگاه قرار دهید.
۲. با انقباض باسن پا را به عقب فشار دهید.
۳. آرام به حالت شروع برگردید.
۴. تکرار کنید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.GLUTES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Goblet Squat (Kettlebell)',
      name_fa: 'اسکوات گابلت (کتل‌بل)',
      slug: createSlug('Goblet Squat Kettlebell'),
      instruction_en: `
1. Hold a kettlebell at chest level.
2. Squat down by bending hips and knees.
3. Push through heels to stand back up.
4. Repeat.`,
      instruction_fa: `
۱. کتل‌بل را جلوی سینه نگه دارید.
۲. با خم کردن زانو و باسن به پایین اسکوات بروید.
۳. با فشار پاشنه‌ها به بالا برگردید.
۴. تکرار کنید.`,
      equipment: EquipmentType.KETTLEBELL,
      muscle_group: MuscleGroup.QUADRICEPS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Good Morning (Barbell)',
      name_fa: 'گود مورنینگ (هالتر)',
      slug: createSlug('Good Morning Barbell'),
      instruction_en: `
1. Place barbell on upper back like a back squat.
2. Hinge at the hips while keeping back straight.
3. Return to standing by engaging hamstrings and glutes.
4. Repeat.`,
      instruction_fa: `
۱. هالتر را مانند اسکوات پشت روی شانه قرار دهید.
۲. از باسن خم شوید و کمر را صاف نگه دارید.
۳. با درگیری پشت پا و باسن به حالت شروع برگردید.
۴. تکرار کنید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.HAMSTRINGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hack Squat',
      name_fa: 'هک اسکوات',
      slug: createSlug('Hack Squat'),
      instruction_en: `
1. Stand on the machine platform with shoulders under the pads.
2. Lower into a squat while keeping back pressed against the pad.
3. Push through heels to stand back up.
4. Repeat.`,
      instruction_fa: `
۱. روی دستگاه هک اسکوات قرار بگیرید و شانه‌ها را زیر پدها قرار دهید.
۲. به حالت اسکوات پایین بروید و کمر را به پد بچسبانید.
۳. با فشار پاشنه‌ها به بالا برگردید.
۴. تکرار کنید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.QUADRICEPS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hack Squat (Barbell)',
      name_fa: 'هک اسکوات با هالتر',
      slug: createSlug('Hack Squat Barbell'),
      instruction_en: `
1. Place barbell behind legs at calf height.
2. Bend knees while keeping chest upright.
3. Stand back up by driving through heels.
4. Repeat.`,
      instruction_fa: `
۱. هالتر را پشت پاها و روی ساق قرار دهید.
۲. با بالا نگه داشتن سینه به حالت اسکوات پایین بروید.
۳. با فشار پاشنه‌ها به بالا برگردید.
۴. تکرار کنید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.QUADRICEPS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hammer Curl (Band)',
      name_fa: 'چکش‌کورل با کش',
      slug: createSlug('Hammer Curl Band'),
      instruction_en: `
1. Stand on the band and hold handles with neutral grip.
2. Curl hands toward shoulders while keeping elbows fixed.
3. Lower back down slowly.
4. Repeat.`,
      instruction_fa: `
۱. روی کش بایستید و دسته‌ها را با دستگیره خنثی بگیرید.
۲. دست‌ها را بدون حرکت دادن آرنج به سمت بالا بیاورید.
۳. با کنترل پایین بیاورید.
۴. تکرار کنید.`,
      equipment: EquipmentType.RESISTANCE_BAND,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hammer Curl (Dumbbell)',
      name_fa: 'چکش‌کورل (دمبل)',
      slug: createSlug('Hammer Curl Dumbbell'),
      instruction_en: `
1. Hold dumbbells with neutral grip.
2. Curl toward shoulders while keeping elbows locked.
3. Lower slowly without swinging.
4. Repeat.`,
      instruction_fa: `
۱. دمبل‌ها را با دستگیره خنثی بگیرید.
۲. بدون حرکت دادن آرنج، دمبل‌ها را بالا بیاورید.
۳. با کنترل پایین بیاورید.
۴. تکرار کنید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hammer Curl (Cable)',
      name_fa: 'چکش‌کورل (سیم‌کش)',
      slug: createSlug('Hammer Curl Cable'),
      instruction_en: `
1. Attach rope to low pulley.
2. Curl hands toward shoulders using neutral grip.
3. Lower with control.
4. Repeat.`,
      instruction_fa: `
۱. طناب را به سیم‌کش پایین وصل کنید.
۲. با دستگیره خنثی، دست‌ها را به سمت شانه بالا بیاورید.
۳. با کنترل پایین بیاورید.
۴. تکرار کنید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hammer Curl (EZ Bar)',
      name_fa: 'چکش‌کورل (هالتر EZ)',
      slug: createSlug('Hammer Curl Ez Bar'),
      instruction_en: `
1. Hold EZ bar with neutral grip.
2. Curl toward shoulders without swinging.
3. Lower bar under control.
4. Repeat.`,
      instruction_fa: `
۱. هالتر EZ را با دستگیره خنثی بگیرید.
۲. بدون تاب دادن دست‌ها را بالا بیاورید.
۳. با کنترل پایین بیاورید.
۴. تکرار کنید.`,
      equipment: EquipmentType.EZ_BAR,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Handstand Push-Up',
      name_fa: 'پوش‌آپ در حالت هندستند',
      slug: createSlug('Handstand Push Up'),
      instruction_en: `
1. Kick into a handstand position against a wall.
2. Lower head toward ground while controlling descent.
3. Push back up until elbows lock.
4. Repeat.`,
      instruction_fa: `
۱. در حالت هندستند کنار دیوار قرار بگیرید.
۲. با کنترل سر را به سمت زمین پایین بیاورید.
۳. به بالا فشار دهید تا آرنج‌ها صاف شوند.
۴. تکرار کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hang Clean (Barbell)',
      name_fa: 'هنگ کلین (هالتر)',
      slug: createSlug('Hang Clean Barbell'),
      instruction_en: `
1. Hold barbell above knees in standing position.
2. Explosively pull bar upward and catch in front rack.
3. Stand up fully.
4. Repeat.`,
      instruction_fa: `
۱. هالتر را بالای زانو در حالت ایستاده نگه دارید.
۲. با سرعت هالتر را بالا بکشید و روی شانه‌ها بگیرید.
۳. کاملاً بایستید.
۴. تکرار کنید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hang Snatch (Barbell)',
      name_fa: 'هنگ اسنچ (هالتر)',
      slug: createSlug('Hang Snatch Barbell'),
      instruction_en: `
1. Hold barbell above knees with wide grip.
2. Explosively pull bar overhead in one motion.
3. Catch bar overhead in stable position.
4. Stand tall.`,
      instruction_fa: `
۱. هالتر را بالای زانو با فاصله زیاد دست‌ها نگه دارید.
۲. هالتر را با یک حرکت سریع بالای سر ببرید.
۳. هالتر را در موقعیت پایدار نگه دارید.
۴. بایستید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.EXPERT,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hanging Knee Skips',
      name_fa: 'بالا آوردن زانو آویزان (اسکیپ)',
      slug: createSlug('Hanging Knee Skips'),
      instruction_en: `
1. Hang from pull-up bar with straight arms.
2. Drive knees upward quickly in alternating motion.
3. Control movement; do not swing excessively.
4. Repeat.`,
      instruction_fa: `
۱. از میله بارفیکس آویزان شوید.
۲. زانوها را به‌صورت تناوبی و سریع بالا بیاورید.
۳. از تاب خوردن بدن جلوگیری کنید.
۴. تکرار کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CORE,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hiking',
      name_fa: 'پیاده‌روی در طبیعت (های‌کینگ)',
      slug: createSlug('Hiking'),
      instruction_en: `
1. Walk or hike outdoors at a steady pace.
2. Maintain good posture and breathing rhythm.
3. Adjust intensity by terrain or pace.`,
      instruction_fa: `
۱. در طبیعت با سرعت ثابت قدم بزنید.
۲. وضعیت بدن و تنفس را کنترل کنید.
۳. شدت تمرین را با مسیر یا سرعت تنظیم کنید.`,
      equipment: EquipmentType.OTHER,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hip Abduction (Machine)',
      name_fa: 'آپداکشن باسن (دستگاه)',
      slug: createSlug('Hip Abduction Machine'),
      instruction_en: `
1. Sit on machine with pads against thighs.
2. Push legs outward against resistance.
3. Return slowly with control.
4. Repeat.`,
      instruction_fa: `
۱. روی دستگاه بنشینید و پدها را روی ران‌ها قرار دهید.
۲. پاها را به سمت بیرون فشار دهید.
۳. آرام به حالت شروع بازگردید.
۴. تکرار کنید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.GLUTES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hip Adduction (Machine)',
      name_fa: 'اداکشن باسن (دستگاه)',
      slug: createSlug('Hip Adduction Machine'),
      instruction_en: `
1. Sit on machine with legs positioned outward.
2. Bring legs together against resistance.
3. Slowly return outward.
4. Repeat.`,
      instruction_fa: `
۱. روی دستگاه بنشینید و پاها را از هم باز نگه دارید.
۲. پاها را به سمت داخل فشار دهید.
۳. آرام به موقعیت شروع بازگردید.
۴. تکرار کنید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.GLUTES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hip Flexor Stretch',
      name_fa: 'کشش فلکسور لگن',
      slug: createSlug('Hip Flexor Stretch'),
      instruction_en: `
1. Kneel on one knee in a lunge position.
2. Shift hips forward until stretch is felt.
3. Hold while breathing deep.`,
      instruction_fa: `
۱. در حالت لانج، روی یک زانو قرار بگیرید.
۲. لگن را به جلو فشار دهید تا کشش ایجاد شود.
۳. با تنفس عمیق در حالت کشش بمانید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.GLUTES,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hip Thrust (Barbell)',
      name_fa: 'هیپ تراست (هالتر)',
      slug: createSlug('Hip Thrust Barbell'),
      instruction_en: `
1. Place upper back on bench and barbell over hips.
2. Drive hips upward by squeezing glutes.
3. Lower hips back down.
4. Repeat.`,
      instruction_fa: `
۱. قسمت بالای کمر را روی نیمکت قرار دهید و هالتر را روی لگن بگذارید.
۲. لگن را با انقباض باسن بالا ببرید.
۳. لگن را پایین بیاورید.
۴. تکرار کنید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.GLUTES,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Hip Thrust (Bodyweight)',
      name_fa: 'هیپ تراست (وزن بدن)',
      slug: createSlug('Hip Thrust Bodyweight'),
      instruction_en: `
1. Lie back on a bench or floor.
2. Drive hips upward by squeezing glutes.
3. Lower back down.
4. Repeat.`,
      instruction_fa: `
۱. روی نیمکت یا زمین قرار بگیرید.
۲. لگن را با انقباض باسن بالا ببرید.
۳. لگن را پایین بیاورید.
۴. تکرار کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.GLUTES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Incline Bench Press (Barbell)',
      name_fa: 'پرس بالا سینه با هالتر',
      slug: createSlug('Incline Bench Press Barbell'),
      instruction_en: `
1. Lie on an incline bench set at 30–45 degrees.
2. Grip the bar slightly wider than shoulder-width.
3. Lower the bar to the upper chest.
4. Press the bar upward until arms are fully extended.`,
      instruction_fa: `
۱. روی نیمکت مایل (۳۰ تا ۴۵ درجه) دراز بکشید.
۲. میله را کمی بازتر از عرض شانه بگیرید.
۳. میله را به سمت بالای سینه پایین بیاورید.
۴. میله را به سمت بالا پرس کنید تا دست‌ها کامل صاف شوند.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Incline Bench Press (Cable)',
      name_fa: 'پرس بالا سینه با سیم‌کش',
      slug: createSlug('Incline Bench Press Cable'),
      instruction_en: `
1. Set cable pulleys low and attach handles.
2. Sit on an incline bench and hold the handles.
3. Press upward in a diagonal motion.
4. Return slowly with control.`,
      instruction_fa: `
۱. سیم‌کش‌ها را در پایین دستگاه تنظیم کنید و دسته‌ها را وصل کنید.
۲. روی نیمکت مایل بنشینید و دسته‌ها را بگیرید.
۳. دسته‌ها را به سمت بالا و مورب پرس کنید.
۴. به‌آرامی به حالت شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Incline Bench Press (Dumbbell)',
      name_fa: 'پرس بالا سینه با دمبل',
      slug: createSlug('Incline Bench Press Dumbbell'),
      instruction_en: `
1. Sit on an incline bench holding dumbbells at shoulder height.
2. Press the dumbbells upward until arms are extended.
3. Lower slowly with control.`,
      instruction_fa: `
۱. روی نیمکت مایل بنشینید و دمبل‌ها را در ارتفاع شانه نگه دارید.
۲. دمبل‌ها را به سمت بالا پرس کنید تا دست‌ها صاف شوند.
۳. با کنترل به پایین بازگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Incline Bench Press (Smith Machine)',
      name_fa: 'پرس بالا سینه با اسمیت',
      slug: createSlug('Incline Bench Press Smith Machine'),
      instruction_en: `
1. Lie on an incline bench under the Smith bar.
2. Lower the bar toward your upper chest.
3. Press upward until your arms are fully extended.`,
      instruction_fa: `
۱. روی نیمکت مایل زیر میله دستگاه اسمیت قرار بگیرید.
۲. میله را به سمت بالای سینه پایین بیاورید.
۳. میله را به سمت بالا پرس کنید تا دست‌ها صاف شوند.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    // ─────────────────────────────
    // Incline Chest Fly (Dumbbell)
    // ─────────────────────────────
    {
      name_en: 'Incline Chest Fly (Dumbbell)',
      name_fa: 'فلای بالا سینه با دمبل',
      slug: createSlug('Incline Chest Fly Dumbbell'),
      instruction_en: `
1. Lie on an incline bench holding dumbbells above your chest.
2. Open your arms in a wide arc until you feel a stretch.
3. Bring the dumbbells back together over your chest.`,
      instruction_fa: `
۱. روی نیمکت مایل دراز بکشید و دمبل‌ها را بالای سینه نگه دارید.
۲. دست‌ها را به صورت قوسی باز کنید تا کشش را احساس کنید.
۳. دمبل‌ها را به بالای سینه بازگردانید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    // ─────────────────────────────
    // Incline Chest Press (Machine)
    // ─────────────────────────────
    {
      name_en: 'Incline Chest Press (Machine)',
      name_fa: 'پرس بالا سینه با دستگاه',
      slug: createSlug('Incline Chest Press Machine'),
      instruction_en: `
1. Adjust the seat so handles are chest level.
2. Press forward until arms are straight.
3. Slowly return to starting position.`,
      instruction_fa: `
۱. صندلی دستگاه را طوری تنظیم کنید که دسته‌ها در سطح سینه باشند.
۲. دسته‌ها را به سمت جلو پرس کنید تا دست‌ها صاف شوند.
۳. به‌آرامی به حالت شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    // ─────────────────────────────
    // Incline Curl (Dumbbell)
    // ─────────────────────────────
    {
      name_en: 'Incline Curl (Dumbbell)',
      name_fa: 'جلو بازو دمبل روی نیمکت مایل',
      slug: createSlug('Incline Curl Dumbbell'),
      instruction_en: `
1. Sit on an incline bench holding dumbbells at your sides.
2. Curl the dumbbells up while keeping elbows still.
3. Lower slowly and repeat.`,
      instruction_fa: `
۱. روی نیمکت مایل بنشینید و دمبل‌ها را کنار بدن نگه دارید.
۲. بدون حرکت دادن آرنج‌ها، دمبل‌ها را بالا ببرید.
۳. با کنترل به پایین بازگردید و تکرار کنید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    // ─────────────────────────────
    // Incline Row (Dumbbell)
    // ─────────────────────────────
    {
      name_en: 'Incline Row (Dumbbell)',
      name_fa: '划 کششی دمبل روی نیمکت مایل',
      slug: createSlug('Incline Row Dumbbell'),
      instruction_en: `
1. Lie on an incline bench face down.
2. Hold dumbbells below your shoulders.
3. Pull dumbbells toward your ribs.
4. Lower slowly.`,
      instruction_fa: `
۱. روی نیمکت مایل روی شکم دراز بکشید.
۲. دمبل‌ها را زیر شانه‌ها نگه دارید.
۳. دمبل‌ها را به سمت دنده‌ها بکشید.
۴. به‌آرامی پایین ببرید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    // ─────────────────────────────
    // Inverted Row (Bodyweight)
    // ─────────────────────────────
    {
      name_en: 'Inverted Row (Bodyweight)',
      name_fa: 'پارویی معکوس با وزن بدن',
      slug: createSlug('Inverted Row Bodyweight'),
      instruction_en: `
1. Lie under a bar set at waist height.
2. Grab the bar with an overhand grip.
3. Pull your chest toward the bar.
4. Lower yourself with control.`,
      instruction_fa: `
۱. زیر میله‌ای در ارتفاع کمر قرار بگیرید.
۲. میله را با گرفتن از بالا بگیرید.
۳. سینه را به سمت میله بکشید.
۴. به‌آرامی بدن را پایین بیاورید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    // ─────────────────────────────
    // Iso-Lateral Chest Press (Machine)
    // ─────────────────────────────
    {
      name_en: 'Iso-Lateral Chest Press (Machine)',
      name_fa: 'پرس سینه ایزولترال با دستگاه',
      slug: createSlug('Iso Lateral Chest Press Machine'),
      instruction_en: `
1. Adjust the seat and grip handles evenly.
2. Press each arm independently forward.
3. Return with control.`,
      instruction_fa: `
۱. صندلی را تنظیم کنید و دسته‌ها را بگیرید.
۲. هر دست را به‌صورت جداگانه به جلو پرس کنید.
۳. با کنترل به حالت شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    // ─────────────────────────────
    // Iso-Lateral Row (Machine)
    // ─────────────────────────────
    {
      name_en: 'Iso-Lateral Row (Machine)',
      name_fa: '划 ایزولترال با دستگاه',
      slug: createSlug('Iso Lateral Row Machine'),
      instruction_en: `
1. Sit upright and grip the machine handles.
2. Pull handles toward your torso one or both arms at a time.
3. Return slowly.`,
      instruction_fa: `
۱. صاف بنشینید و دسته‌ها را بگیرید.
۲. دسته‌ها را به سمت بدن بکشید (می‌توانید هر دست را جداگانه تمرین دهید).
۳. با کنترل به حالت شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Jackknife Sit-Up',
      name_fa: 'جمع کردن بدن (جک‌نایف)',
      slug: createSlug('Jackknife Sit-Up'),
      instruction_en: `
1. Lie flat on your back with arms extended overhead.
2. Simultaneously lift your legs and torso.
3. Reach your hands toward your feet, forming a V shape.
4. Lower back down with control.`,
      instruction_fa: `
۱. صاف روی زمین دراز بکشید و دست‌ها را بالای سر بکشید.
۲. همزمان پاها و بالاتنه را بالا بیاورید.
۳. با دستان خود به نوک پاها نزدیک شوید و حالت V ایجاد کنید.
۴. با کنترل به زمین بازگردید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.ABS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Jump Rope',
      name_fa: 'طناب‌زنی',
      slug: createSlug('Jump Rope'),
      instruction_en: `
1. Hold rope handles with elbows close to your sides.
2. Jump lightly on the balls of your feet.
3. Rotate the rope using wrists, not arms.`,
      instruction_fa: `
۱. دسته‌های طناب را گرفته و آرنج‌ها را نزدیک بدن نگه دارید.
۲. روی پنجه پاها به آرامی بپرید.
۳. چرخش طناب را با مچ‌ها انجام دهید، نه با دست‌ها.`,
      equipment: EquipmentType.OTHER,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Jump Shrug (Barbell)',
      name_fa: 'پرش شراگ با هالتر',
      slug: createSlug('Jump Shrug Barbell'),
      instruction_en: `
1. Stand holding a barbell at thigh level.
2. Dip slightly at the hips and knees.
3. Explosively jump and shrug shoulders upward.
4. Land softly and reset.`,
      instruction_fa: `
۱. هالتر را در جلوی ران‌ها نگه دارید.
۲. کمی زانو و باسن را خم کنید.
۳. همراه با یک پرش کوتاه شانه‌ها را بالا ببرید.
۴. نرم فرود بیایید و تکرار کنید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Jump Squat',
      name_fa: 'اسکوات پرشی',
      slug: createSlug('Jump Squat'),
      instruction_en: `
1. Perform a regular squat.
2. Explosively jump upward.
3. Land softly and descend into the next squat.`,
      instruction_fa: `
۱. مانند اسکوات معمولی پایین بروید.
۲. با قدرت از زمین جدا شوید و بپرید.
۳. نرم فرود بیایید و دوباره به اسکوات بروید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Jumping Jack',
      name_fa: 'جامپینگ جک',
      slug: createSlug('Jumping Jack'),
      instruction_en: `
1. Stand tall with arms at sides.
2. Jump feet apart while raising arms overhead.
3. Jump back to starting position.`,
      instruction_fa: `
۱. صاف بایستید و دست‌ها کنار بدن باشد.
۲. با یک پرش، پاها را باز و دست‌ها را بالای سر ببرید.
۳. دوباره با پرش به حالت شروع بازگردید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Kettlebell Swing',
      name_fa: 'سویینگ کتل‌بل',
      slug: createSlug('Kettlebell Swing'),
      instruction_en: `
1. Stand with feet shoulder-width apart.
2. Hinge at the hips and swing the kettlebell backward.
3. Drive hips forward to swing it to shoulder height.`,
      instruction_fa: `
۱. پاها را به عرض شانه باز کنید.
۲. باسن را به عقب ببرید و کتل‌بل را به عقب تاب دهید.
۳. با فشار باسن، کتل‌بل را تا ارتفاع شانه بالا بیاورید.`,
      equipment: EquipmentType.KETTLEBELL,
      muscle_group: MuscleGroup.GLUTES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Kettlebell Turkish Get-Up',
      name_fa: 'ترکیش گت‌آپ با کتل‌بل',
      slug: createSlug('Kettlebell Turkish Get-Up'),
      instruction_en: `
1. Lie on your back holding a kettlebell overhead.
2. Roll to your elbow, then your hand.
3. Stand up while keeping arm locked.
4. Reverse the movement to return.`,
      instruction_fa: `
۱. روی زمین دراز بکشید و کتل‌بل را بالای سر نگه دارید.
۲. ابتدا روی آرنج سپس روی دست قرار بگیرید.
۳. با حفظ دست صاف، بلند شوید.
۴. حرکت را معکوس کنید و به حالت شروع بازگردید.`,
      equipment: EquipmentType.KETTLEBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Kettlebell Windmill',
      name_fa: 'ویندمیل با کتل‌بل',
      slug: createSlug('Kettlebell Windmill'),
      instruction_en: `
1. Hold kettlebell overhead in one hand.
2. Push hips to the opposite side.
3. Reach down toward the floor with free hand.`,
      instruction_fa: `
۱. کتل‌بل را بالای سر با یک دست نگه دارید.
۲. باسن را به سمت مخالف هل دهید.
۳. با دست آزاد به سمت زمین حرکت کنید.`,
      equipment: EquipmentType.KETTLEBELL,
      muscle_group: MuscleGroup.CORE,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Kipping Pull-Up',
      name_fa: 'پول‌آپ کیپینگ',
      slug: createSlug('Kipping Pull-Up'),
      instruction_en: `
1. Hang from the bar with an overhand grip.
2. Swing using hip drive to build momentum.
3. Pull your chin above the bar.`,
      instruction_fa: `
۱. از میله بارفیکس آویزان شوید.
۲. با استفاده از حرکت باسن شتاب ایجاد کنید.
۳. خود را بالا بکشید تا چانه بالای میله قرار گیرد.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: "Knee Raise (Captain's Chair)",
      name_fa: 'بالا آوردن زانو (کاپیتان چیر)',
      slug: createSlug('Knee Raise Captains Chair'),
      instruction_en: `
1. Place forearms on the pads and hang legs down.
2. Lift knees toward chest.
3. Lower slowly without swinging.`,
      instruction_fa: `
۱. ساعدها روی تکیه‌گاه قرار گیرد و پاها آویزان باشند.
۲. زانوها را به سمت سینه بالا بیاورید.
۳. بدون تاب خوردن پاها را پایین ببرید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.ABS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Kneeling Pulldown (Band)',
      name_fa: 'کشیدن لت در حالت زانو زده با کش',
      slug: createSlug('Kneeling Pulldown Band'),
      instruction_en: `
1. Anchor band overhead and kneel.
2. Pull band down toward chest.
3. Return slowly with control.`,
      instruction_fa: `
۱. کش را بالا ثابت کنید و زانو بزنید.
۲. کش را به سمت سینه پایین بکشید.
۳. با کنترل به حالت شروع بازگردید.`,
      equipment: EquipmentType.BAND,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Knees to Elbows',
      name_fa: 'زانو به آرنج',
      slug: createSlug('Knees to Elbows'),
      instruction_en: `
1. Hang from a pull-up bar.
2. Lift knees toward your elbows.
3. Lower with control without swinging.`,
      instruction_fa: `
۱. از میله بارفیکس آویزان شوید.
۲. زانوها را به سمت آرنج‌ها بالا بیاورید.
۳. بدون تاب خوردن پاها را پایین ببرید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.ABS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Lat Pulldown (Cable)',
      name_fa: 'لت پول‌دان سیم‌کش',
      slug: createSlug('Lat Pulldown Cable'),
      instruction_en: `
1. Sit down and adjust the thigh pad to secure your legs.
2. Grab the bar wider than shoulder-width.
3. Pull the bar down toward your upper chest.
4. Control the bar back to the starting position.`,
      instruction_fa: `
۱. روی دستگاه بنشینید و پد پا را تنظیم کنید.
۲. میله را کمی بازتر از عرض شانه بگیرید.
۳. میله را به سمت بالای سینه بکشید.
۴. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Lat Pulldown (Machine)',
      name_fa: 'لت پول‌دان دستگاه',
      slug: createSlug('Lat Pulldown Machine'),
      instruction_en: `
1. Sit and adjust the seat and leg pads.
2. Grip the handles and pull down until elbows reach your sides.
3. Slowly return to starting position.`,
      instruction_fa: `
۱. روی دستگاه نشسته و پد پا را تنظیم کنید.
۲. دسته‌ها را گرفته و تا کنار بدن پایین بکشید.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Lat Pulldown (Single Arm)',
      name_fa: 'لت پول‌دان تک دست',
      slug: createSlug('Lat Pulldown Single Arm'),
      instruction_en: `
1. Sit upright and hold a single handle with one hand.
2. Pull the handle down toward your chest.
3. Return to starting position with control.`,
      instruction_fa: `
۱. صاف بنشینید و دسته را با یک دست بگیرید.
۲. دسته را به سمت سینه پایین بکشید.
۳. با کنترل به نقطه شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Lat Pulldown - Underhand (Band)',
      name_fa: 'لت پول‌دان دست‌برعکس با کش',
      slug: createSlug('Lat Pulldown Underhand Band'),
      instruction_en: `
1. Hold the band with an underhand grip.
2. Pull the band down toward your chest.
3. Slowly return to starting position.`,
      instruction_fa: `
۱. کش را با گرفتن زیر دست بگیرید.
۲. کش را به سمت سینه پایین بکشید.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.BAND,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Lat Pulldown - Underhand (Cable)',
      name_fa: 'لت پول‌دان دست‌برعکس سیم‌کش',
      slug: createSlug('Lat Pulldown Underhand Cable'),
      instruction_en: `
1. Grab the bar with underhand grip (palms facing you).
2. Pull the bar toward your upper chest.
3. Slowly return with control.`,
      instruction_fa: `
۱. میله را با گرفتن زیر دست بگیرید.
۲. میله را به سمت سینه پایین بکشید.
۳. با کنترل به نقطه شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Lat Pulldown - Wide Grip (Cable)',
      name_fa: 'لت پول‌دان دست باز سیم‌کش',
      slug: createSlug('Lat Pulldown Wide Grip Cable'),
      instruction_en: `
1. Grip the bar wider than shoulder-width.
2. Pull the bar down to chest level.
3. Return slowly to starting position.`,
      instruction_fa: `
۱. میله را بازتر از عرض شانه بگیرید.
۲. میله را تا سطح سینه پایین بکشید.
۳. به‌آرامی بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Lateral Box Jump',
      name_fa: 'پرش افقی روی باکس',
      slug: createSlug('Lateral Box Jump'),
      instruction_en: `
1. Stand beside the box.
2. Jump laterally onto the box and land softly.
3. Step down and repeat.`,
      instruction_fa: `
۱. کنار باکس بایستید.
۲. به صورت جانبی روی باکس بپرید و نرم فرود بیایید.
۳. پایین بیایید و تکرار کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Lateral Raise (Dumbbell)',
      name_fa: 'فراگیری جانب با دمبل',
      slug: createSlug('Lateral Raise Dumbbell'),
      instruction_en: `
1. Hold dumbbells at your sides.
2. Raise arms to shoulder height.
3. Lower slowly.`,
      instruction_fa: `
۱. دمبل‌ها را کنار بدن نگه دارید.
۲. دست‌ها را تا سطح شانه بالا ببرید.
۳. به‌آرامی پایین بیاورید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Lateral Raise (Machine)',
      name_fa: 'فراگیری جانب دستگاه',
      slug: createSlug('Lateral Raise Machine'),
      instruction_en: `
1. Sit upright on the machine.
2. Raise the arms to shoulder height.
3. Lower slowly.`,
      instruction_fa: `
۱. روی دستگاه بنشینید.
۲. دست‌ها را تا سطح شانه بالا ببرید.
۳. به‌آرامی پایین بیاورید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Leg Extension (Machine)',
      name_fa: 'پرس جلو پا دستگاه',
      slug: createSlug('Leg Extension Machine'),
      instruction_en: `
1. Sit and adjust the pad just above the ankles.
2. Extend legs until knees are straight.
3. Lower back slowly.`,
      instruction_fa: `
۱. بنشینید و پد را بالای مچ پا تنظیم کنید.
۲. پاها را صاف کنید.
۳. به‌آرامی پایین بیاورید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.QUADRICEPS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Leg Press (Machine)',
      name_fa: 'پرس پا دستگاه',
      slug: createSlug('Leg Press'),
      instruction_en: `
1. Place feet shoulder-width on the platform.
2. Push the platform away by extending legs.
3. Return with control without locking knees.`,
      instruction_fa: `
۱. پاها را به اندازه عرض شانه روی صفحه قرار دهید.
۲. صفحه را با فشار پاها بالا ببرید.
۳. بدون قفل کردن زانوها به‌آرامی بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Long Pull (Machine)',
      name_fa: 'لانگ پول دستگاه',
      slug: createSlug('Long Pull Machine'),
      instruction_en: `
1. Sit and grab the handle.
2. Pull toward your abdomen.
3. Return slowly.`,
      instruction_fa: `
۱. روی دستگاه نشسته و دسته را بگیرید.
۲. دسته را به سمت شکم بکشید.
۳. آرام بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Lunge (Bodyweight)',
      name_fa: 'لانج با وزن بدن',
      slug: createSlug('Lunge Bodyweight'),
      instruction_en: `
1. Step forward and lower your body into a lunge.
2. Push back to start position.`,
      instruction_fa: `
۱. یک قدم جلو گذاشته و به حالت لانج پایین بروید.
۲. به نقطه شروع بازگردید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Lunge (Dumbbell)',
      name_fa: 'لانج با دمبل',
      slug: createSlug('Lunge Dumbbell'),
      instruction_en: `
1. Hold dumbbells at your sides.
2. Step forward and lower into a lunge.
3. Push back to start.`,
      instruction_fa: `
۱. دمبل را کنار بدن نگه دارید.
۲. یک قدم جلو گذاشته و لانج انجام دهید.
۳. به نقطه شروع بازگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Lunge (Kettlebell)',
      name_fa: 'لانج با کتل‌بل',
      slug: createSlug('Lunge Kettlebell'),
      instruction_en: `
1. Hold kettlebells at your sides.
2. Step forward and lower into lunge.
3. Push back to start.`,
      instruction_fa: `
۱. کتل‌بل را کنار بدن نگه دارید.
۲. یک قدم جلو گذاشته و لانج انجام دهید.
۳. به نقطه شروع بازگردید.`,
      equipment: EquipmentType.KETTLEBELL,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Lying Leg Curl (Machine)',
      name_fa: 'پشت پا خوابیده دستگاه',
      slug: createSlug('Lying Leg Curl Machine'),
      instruction_en: `
1. Lie face down on the machine.
2. Curl legs upward by squeezing hamstrings.
3. Return to start position.`,
      instruction_fa: `
۱. روی دستگاه به شکم دراز بکشید.
۲. مچ پا را بالا آورده و عضله پشت پا را منقبض کنید.
۳. به‌آرامی پایین برگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.HAMSTRINGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Mountain Climber',
      name_fa: 'کوه‌نوردی (حرکت)',
      slug: createSlug('Mountain Climber'),
      instruction_en: `
1. Start in a high plank position.
2. Drive one knee toward your chest.
3. Quickly alternate legs as if running in place.`,
      instruction_fa: `
۱. در وضعیت پلانک قرار بگیرید.
۲. یک زانو را به سمت قفسه سینه بیاورید.
۳. پاها را به‌صورت سریع و متناوب جابجا کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CORE,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Muscle Up',
      name_fa: 'ماسِل آپ',
      slug: createSlug('Muscle Up'),
      instruction_en: `
1. Hang from the bar with a strong grip.
2. Pull explosively until chest reaches above the bar.
3. Transition by pushing your torso over and perform a dip to lock out.`,
      instruction_fa: `
۱. از میله آویزان شوید.
۲. با قدرت خود را بالا بکشید تا سینه بالای میله برسد.
۳. بدن را روی میله انتقال دهید و با یک حرکت دیپ دست‌ها را صاف کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.EXPERT,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Oblique Crunch',
      name_fa: 'کرانچ مورب',
      slug: createSlug('Oblique Crunch'),
      instruction_en: `
1. Lie on your back with knees bent.
2. Twist your torso while bringing elbow toward opposite knee.
3. Return and repeat on the other side.`,
      instruction_fa: `
۱. به پشت دراز بکشید و زانوها را خم کنید.
۲. بدن را پیچ داده و آرنج را به زانوی مخالف نزدیک کنید.
۳. به حالت شروع بازگردید و طرف دیگر را تکرار کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.OBLIQUES ?? MuscleGroup.ABS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Overhead Press (Barbell)',
      name_fa: 'پرس بالای سر با هالتر',
      slug: createSlug('Overhead Press Barbell'),
      instruction_en: `
1. Stand with barbell at shoulder height.
2. Press overhead until arms fully extend.
3. Lower with control.`,
      instruction_fa: `
۱. هالتر را در سطح شانه نگه دارید.
۲. آن را بالای سر پرس کنید تا دست‌ها صاف شوند.
۳. با کنترل پایین بیاورید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Overhead Press (Cable)',
      name_fa: 'پرس بالای سر سیم‌کش',
      slug: createSlug('Overhead Press Cable'),
      instruction_en: `
1. Set cable handles at shoulder height.
2. Press upward until arms are straight.
3. Return slowly to starting position.`,
      instruction_fa: `
۱. دسته‌های سیم‌کش را در ارتفاع شانه تنظیم کنید.
۲. آنها را به سمت بالا پرس کنید.
۳. به‌آرامی به حالت شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Overhead Press (Dumbbell)',
      name_fa: 'پرس بالای سر با دمبل',
      slug: createSlug('Overhead Press Dumbbell'),
      instruction_en: `
1. Hold dumbbells at shoulder height.
2. Press them overhead until arms are extended.
3. Lower slowly.`,
      instruction_fa: `
۱. دمبل‌ها را در سطح شانه نگه دارید.
۲. آنها را بالای سر پرس کنید.
۳. به‌آرامی پایین بیاورید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Overhead Press (Machine)',
      name_fa: 'پرس بالای سر دستگاه',
      slug: createSlug('Overhead Press Machine'),
      instruction_en: `
1. Sit on the machine with back supported.
2. Press the handles overhead.
3. Lower with control.`,
      instruction_fa: `
۱. روی دستگاه نشسته و تکیه دهید.
۲. دسته‌ها را به سمت بالا پرس کنید.
۳. با کنترل پایین بیاورید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },

    {
      name_en: 'Overhead Squat (Barbell)',
      name_fa: 'اسکوات بالای سر با هالتر',
      slug: createSlug('Overhead Squat Barbell'),
      instruction_en: `
1. Hold barbell overhead with arms locked.
2. Squat down while keeping the bar stable.
3. Stand back up maintaining balance.`,
      instruction_fa: `
۱. هالتر را بالای سر گرفته و دست‌ها را صاف نگه دارید.
۲. اسکوات بروید و هالتر را ثابت نگه دارید.
۳. با حفظ تعادل بلند شوید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },

    //     P
    {
      name_en: 'Pec Deck (Machine)',
      name_fa: 'پک‌دک سینه با دستگاه',
      slug: createSlug('Pec Deck Machine'),
      instruction_en: `
1. Sit with back flat against the pad.
2. Place forearms on the pads or grab handles.
3. Bring elbows together in front of chest.
4. Slowly return to starting position.`,
      instruction_fa: `
۱. بنشینید و پشت خود را روی پد دستگاه صاف قرار دهید.
۲. آرنج‌ها را روی پَدها بگذارید یا دسته‌ها را بگیرید.
۳. آرنج‌ها را به سمت جلو به هم بیاورید.
۴. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Pendlay Row (Barbell)',
      name_fa: 'رو پندلی با هالتر',
      slug: createSlug('Pendlay Row Barbell'),
      instruction_en: `
1. Stand with barbell on floor, feet shoulder-width.
2. Bend over with back parallel to floor.
3. Pull barbell to your waist, then lower to floor each rep.`,
      instruction_fa: `
۱. بایستید با هالتر روی زمین، پاها به عرض شانه باز.
۲. به جلو خم شوید تا پشت موازی زمین شود.
۳. هالتر را تا کمر بکشید، سپس هر تکرار را به زمین برگردانید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Pistol Squat',
      name_fa: 'اسکوات تک‌پا (پیستول)',
      slug: createSlug('Pistol Squat'),
      instruction_en: `
1. Stand on one leg and extend the other in front.
2. Squat down on the supporting leg keeping balance.
3. Rise back up and repeat on the other leg.`,
      instruction_fa: `
۱. روی یک پا بایستید و پای دیگر را به جلو دراز کنید.
۲. با حفظ تعادل روی پای ثابت اسکوات بروید.
۳. به بالا برگردید و سمت دیگر را انجام دهید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Plank',
      name_fa: 'پلانک',
      slug: createSlug('Plank'),
      instruction_en: `
1. Assume forearm plank position—elbows under shoulders.
2. Keep body in straight line from head to heels.
3. Hold for duration without dropping hips.`,
      instruction_fa: `
۱. در وضعیت پلانک روی ساعدها قرار بگیرید.
۲. بدن را از سر تا پاشنه در یک خط نگه دارید.
۳. تا زمان موردنظر نگه دارید بدون افتادن باسن.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CORE,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Power Clean',
      name_fa: 'پاور کلین',
      slug: createSlug('Power Clean'),
      instruction_en: `
1. Stand with barbell on floor, grip just outside knees.
2. Explosively pull bar upward and catch at shoulder height.
3. Stand tall to finish.`,
      instruction_fa: `
۱. بایستید با هالتر روی زمین، دست‌ها کمی بازتر از زانوها.
۲. با حرکت انفجاری هالتر را بالا بکشید و در سطح شانه بگیرید.
۳. صاف بایستید تا حرکت کامل شود.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.EXPERT,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Power Snatch (Barbell)',
      name_fa: 'پاور اسنچ با هالتر',
      slug: createSlug('Power Snatch Barbell'),
      instruction_en: `
1. Start with barbell on floor, feet hip-width.
2. Explosively lift bar overhead in one motion.
3. Lock arms and stabilize.`,
      instruction_fa: `
۱. با هالتر روی زمین و پاها به عرض لگن شروع کنید.
۲. هالتر را در یک حرکت انفجاری بالای سر ببرید.
۳. دست‌ها را قفل کرده و تعادل را حفظ کنید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.EXPERT,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Preacher Curl (EZ Bar)',
      name_fa: 'جلوبازو پیش‌آموزِشی با EZ بار',
      slug: createSlug('Preacher Curl Ez Bar'),
      instruction_en: `
1. Sit at preacher bench and hold EZ bar.
2. Curl bar upward toward shoulders.
3. Lower under control until arms are extended.`,
      instruction_fa: `
۱. روی نیمکت پژوهشی بنشینید و EZ بار را بگیرید.
۲. بار را به سمت شانه‌ها بالا ببرید.
۳. تا زمان امتداد کامل دست‌ها به‌آرامی پایین بیاورید.`,
      equipment: EquipmentType.EZ_BAR,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Preacher Curl (Dumbbell)',
      name_fa: 'جلوبازو پیش‌آموزِشی با دمبل',
      slug: createSlug('Preacher Curl Dumbbell'),
      instruction_en: `
1. Sit at preacher bench holding dumbbells at arms extended.
2. Curl dumbbells upward.
3. Lower until arms nearly straight.`,
      instruction_fa: `
۱. روی نیمکت پژوهشی بنشینید و دمبل‌ها را با دست‌ها صاف نگه دارید.
۲. دمبل‌ها را به سمت بالا بیاورید.
۳. تا زمانی‌که دست‌ها تقریباً صاف شوند، پایین بیاورید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Prone Leg Curl (Machine)',
      name_fa: 'پشت‌پا خم خوابیده با دستگاه',
      slug: createSlug('Prone Leg Curl Machine'),
      instruction_en: `
1. Lie face down on machine and place ankles under pads.
2. Curl legs upward toward glutes.
3. Lower under control.`,
      instruction_fa: `
۱. روی دستگاه به شکم دراز بکشید و مچ پاها زیر پد قرار دهید.
۲. پاها را به سمت باسن خم کنید.
۳. با کنترل پایین بیاورید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.HAMSTRINGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Press Under (Barbell)',
      name_fa: 'پرس زیر (هالتر)',
      slug: createSlug('Press Under Barbell'),
      instruction_en: `
1. Hold barbell at chest height.
2. Dip slightly and press barbell overhead.
3. Lower back to chest level.`,
      instruction_fa: `
۱. هالتر را در سطح سینه نگه دارید.
۲. کمی پایین رفته و هالتر را بالای سر ببرید.
۳. هالتر را به سمت سینه پایین بیاورید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Pull Up',
      name_fa: 'پول‌آپ',
      slug: createSlug('Pull Up'),
      instruction_en: `
1. Grab a pull-up bar with an overhand grip.
2. Pull your body up until chin passes the bar.
3. Lower with control until arms are fully extended.`,
      instruction_fa: `
۱. میله بارفیکس را با گرفتن از بالا بگیرید.
۲. بدن را بالا بکشید تا چانه از میله عبور کند.
۳. با کنترل به وضعیت شروع بازگردید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Pull Up (Assisted Bodyweight)',
      name_fa: 'پول‌آپ کمکی',
      slug: createSlug('Pull Up Assisted Bodyweight'),
      instruction_en: `
1. Use an assisted pull-up machine or resistance band.
2. Pull up until chin passes the bar.
3. Lower slowly with control.`,
      instruction_fa: `
۱. از دستگاه کمکی یا کش کمک‌حرکت استفاده کنید.
۲. بدن را بالا بکشید تا چانه از میله عبور کند.
۳. به‌آرامی پایین بیایید.`,
      equipment: EquipmentType.ASSISTED_BODY_WEIGHT,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Pull Up (Band)',
      name_fa: 'پول‌آپ با کش',
      slug: createSlug('Pull Up Band'),
      instruction_en: `
1. Loop a resistance band over the pull-up bar and kneel or stand in it.
2. Pull until chin passes the bar.
3. Lower with control.`,
      instruction_fa: `
۱. کش را روی میله بارفیکس حلقه کنید و داخل آن بایستید یا زانو بزنید.
۲. بدن را بالا بکشید تا چانه از میله عبور کند.
۳. با کنترل پایین بیاورید.`,
      equipment: EquipmentType.RESISTANCE_BAND,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Pull Up (Machine)',
      name_fa: 'پول‌آپ دستگاه',
      slug: createSlug('Pull Up Machine'),
      instruction_en: `
1. Adjust the assisted pull-up machine settings.
2. Grab handles and pull up until chin passes the bar.
3. Return slowly.`,
      instruction_fa: `
۱. تنظیمات دستگاه کمکی بارفیکس را انجام دهید.
۲. دست‌ها را بگیرید و بدن را بالا بکشید تا چانه از میله عبور کند.
۳. به‌آرامی پایین بیایید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Pullover (Dumbbell)',
      name_fa: 'پول‌اور با دمبل',
      slug: createSlug('Pullover Dumbbell'),
      instruction_en: `
1. Lie on a bench holding a dumbbell above your chest.
2. Lower the dumbbell behind your head keeping arms slightly bent.
3. Pull it back up over your chest.`,
      instruction_fa: `
۱. روی نیمکت دراز بکشید و دمبل را بالای سینه نگه دارید.
۲. دمبل را پشت سر بگیرید با حفظ کمی خمیدگی در آرنج.
۳. دمبل را به بالای سینه بازگردانید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Pullover (Machine)',
      name_fa: 'پول‌اور با دستگاه',
      slug: createSlug('Pullover Machine'),
      instruction_en: `
1. Sit or lie on the machine and hold the handles above chest.
2. Pull the handles back and down behind your head.
3. Return slowly to start.`,
      instruction_fa: `
۱. روی دستگاه بنشینید یا دراز بکشید و دسته‌ها را بالای سینه بگیرید.
۲. دسته‌ها را به سمت پشت سر و پایین بکشید.
۳. با کنترل بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Push Press',
      name_fa: 'پرس پوش‌پرس',
      slug: createSlug('Push Press'),
      instruction_en: `
1. Hold barbell at shoulder height.
2. Slightly dip knees and drive upward, pressing the bar overhead.
3. Lower bar to shoulders and repeat.`,
      instruction_fa: `
۱. هالتر را در سطح شانه نگه دارید.
۲. کمی زانوها را خم کرده و با فشار بالا هالتر را پرس کنید.
۳. هالتر را به سطح شانه بازگردانید و تکرار کنید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Push Up',
      name_fa: 'پوش‌آپ',
      slug: createSlug('Push Up'),
      instruction_en: `
1. Get into a high plank position.
2. Lower your body until your chest nearly touches the floor.
3. Push back up to start.`,
      instruction_fa: `
۱. در وضعیت پلانک بالا قرار بگیرید.
۲. بدن را پایین بیاورید تا سینه تقریباً زمین را لمس کند.
۳. با فشار بالا بروید به نقطه شروع.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Push Up (Band)',
      name_fa: 'پوش‌آپ با کش',
      slug: createSlug('Push Up Band'),
      instruction_en: `
1. Place resistance band across your upper back.
2. Perform a push-up with the band adding resistance.
3. Return under control.`,
      instruction_fa: `
۱. کش را روی قسمت بالای پشت قرار دهید.
۲. پوش‌آپ انجام دهید در حالی که کش فشار اضافی ایجاد می‌کند.
۳. با کنترل به نقطه شروع بازگردید.`,
      equipment: EquipmentType.RESISTANCE_BAND,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Push Up (Knees)',
      name_fa: 'پوش‌آپ با زانوها',
      slug: createSlug('Push Up Knees'),
      instruction_en: `
1. Start with knees on the floor and hands under shoulders.
2. Lower body until chest nearly touches ground.
3. Press back up to starting position.`,
      instruction_fa: `
۱. با قرار دادن زانوها روی زمین و دستان زیر شانه‌ها شروع کنید.
۲. بدن را پایین بیاورید تا سینه تقریباً زمین را لمس کند.
۳. بالا بروید به نقطه شروع.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CHEST,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Rack Pull (Barbell)',
      name_fa: 'رک پول با هالتر',
      slug: createSlug('Rack Pull Barbell'),
      instruction_en: `
1. Set barbell on safety pins or blocks just below knees.
2. Stand with feet hip-width and grip bar.
3. Drive hips forward to stand tall.
4. Lower with control back to supports.`,
      instruction_fa: `
۱. هالتر را روی رک یا بلاک‌ها، کمی پایین‌تر از زانو قرار دهید.
۲. پاها به عرض لگن و هالتر را بگیرید.
۳. باسن را به جلو فشار دهید و صاف بایستید.
۴. هالتر را با کنترل بازگردانید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Reverse Crunch',
      name_fa: 'کرانچ معکوس',
      slug: createSlug('Reverse Crunch'),
      instruction_en: `
1. Lie on back, legs bent, hands at your sides.
2. Lift hips off floor while pulling knees toward chest.
3. Lower slowly without swinging.`,
      instruction_fa: `
۱. به پشت دراز بکشید، پاها خم، دست‌ها کنار بدن.
۲. باسن را از زمین بلند کنید و زانوها را به سمت سینه ببرید.
۳. با کنترل پایین برگردید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CORE,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Reverse Curl (Band)',
      name_fa: 'جلوبازو معکوس با کش',
      slug: createSlug('Reverse Curl Band'),
      instruction_en: `
1. Stand on band and grip with palms facing down.
2. Curl hands upward while keeping wrists neutral.
3. Lower slowly.`,
      instruction_fa: `
۱. روی کش بایستید و دسته‌ها را با کف دست رو به پایین بگیرید.
۲. دست‌ها را بالا بیاورید.
۳. آرام پایین برگردید.`,
      equipment: EquipmentType.RESISTANCE_BAND,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Reverse Curl (Barbell)',
      name_fa: 'جلوبازو معکوس با هالتر',
      slug: createSlug('Reverse Curl Barbell'),
      instruction_en: `
1. Stand with barbell using overhand grip.
2. Curl bar upward while keeping elbows still.
3. Lower slowly.`,
      instruction_fa: `
۱. بایستید و هالتر را با کف دست رو به پایین بگیرید.
۲. هالتر را بالا بیاورید بدون حرکت آرنج‌ها.
۳. آرام پایین برگردید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Reverse Curl (Dumbbell)',
      name_fa: 'جلوبازو معکوس با دمبل',
      slug: createSlug('Reverse Curl Dumbbell'),
      instruction_en: `
1. Hold dumbbells with palms facing down.
2. Curl upward keeping elbows tight.
3. Lower under control.`,
      instruction_fa: `
۱. دمبل‌ها را با کف دست رو به پایین بگیرید.
۲. دست‌ها را بالا بیاورید، آرنج‌ها ثابت.
۳. به آرامی پایین برگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Reverse Fly (Cable)',
      name_fa: 'فِلای معکوس با سیم‌کش',
      slug: createSlug('Reverse Fly Cable'),
      instruction_en: `
1. Set pulleys at shoulder height and grab handles crossed.
2. Pull arms back and apart, squeezing rear delts.
3. Return slowly.`,
      instruction_fa: `
۱. قرقره‌ها را در ارتفاع شانه تنظیم کنید و دسته‌ها را به صورت ضربدری بگیرید.
₂. دست‌ها را به عقب و بیرون بکشید و پشت سرشانه را منقبض کنید.
۳. با کنترل برگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Reverse Fly (Dumbbell)',
      name_fa: 'فِلای معکوس با دمبل',
      slug: createSlug('Reverse Fly Dumbbell'),
      instruction_en: `
1. Bend forward with flat back, dumbbells hanging.
2. Lift dumbbells laterally squeezing shoulder blades.
3. Lower slowly.`,
      instruction_fa: `
۱. خم شوید و پشت را صاف نگه دارید، دمبل‌ها آویزان.
۲. دمبل‌ها را به طرفین بالا ببرید و کتف‌ها را جمع کنید.
۳. به آرامی پایین برگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Reverse Fly (Machine)',
      name_fa: 'فِلای معکوس با دستگاه',
      slug: createSlug('Reverse Fly Machine'),
      instruction_en: `
1. Sit on machine facing the pad.
2. Pull handles back and squeeze shoulder blades.
3. Return slowly.`,
      instruction_fa: `
۱. روی دستگاه بنشینید و رو به دستگاه قرار بگیرید.
۲. دسته‌ها را به سمت عقب بکشید و پشت سرشانه را منقبض کنید.
۳. آرام برگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Reverse Grip Concentration Curl (Dumbbell)',
      name_fa: 'جلوبازو تمرکزی معکوس با دمبل',
      slug: createSlug('Reverse Grip Concentration Curl Dumbbell'),
      instruction_en: `
1. Sit and brace elbow against inner thigh.
2. Hold dumbbell with overhand grip.
3. Curl upward, squeeze, lower with control.`,
      instruction_fa: `
۱. بنشینید و آرنج را روی داخل ران قرار دهید.
۲. دمبل را با کف دست رو به پایین بگیرید.
۳. دمبل را بالا بیاورید، مکث کنید و آرام پایین بیاورید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.BICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Reverse Plank',
      name_fa: 'پلانک معکوس',
      slug: createSlug('Reverse Plank'),
      instruction_en: `
1. Sit with hands behind hips, fingers forward.
2. Lift hips up creating a straight line head-to-heels.
3. Hold position and breathe steadily.`,
      instruction_fa: `
۱. بنشینید و دست‌ها را پشت لگن قرار دهید.
۲. باسن را بالا ببرید تا بدن در یک خط صاف قرار گیرد.
۳. وضعیت را نگه دارید و به آرامی تنفس کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CORE,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Romanian Deadlift (Barbell)',
      name_fa: 'ددلیفت رومانیایی با هالتر',
      slug: createSlug('Romanian Deadlift Barbell'),
      instruction_en: `
1. Stand holding barbell at thighs.
2. Hinge at hips keeping back straight.
3. Lower until hamstrings stretch.
4. Return to upright position.`,
      instruction_fa: `
۱. بایستید و هالتر را در جلوی ران نگه دارید.
۲. باسن را عقب ببرید و پشت را صاف نگه دارید.
۳. تا کشش پشت پا پایین بروید.
۴. دوباره صاف بایستید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.HAMSTRINGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Romanian Deadlift (Dumbbell)',
      name_fa: 'ددلیفت رومانیایی با دمبل',
      slug: createSlug('Romanian Deadlift Dumbbell'),
      instruction_en: `
1. Stand holding dumbbells in front of thighs.
2. Hinge at hips lowering dumbbells toward floor.
3. Return keeping spine neutral.`,
      instruction_fa: `
۱. بایستید و دمبل‌ها را در جلوی ران نگه دارید.
۲. باسن را عقب برده و دمبل‌ها را پایین ببرید.
۳. با حفظ پشت صاف به بالا بازگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.HAMSTRINGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Rowing (Machine)',
      name_fa: 'قایقرانی با دستگاه',
      slug: createSlug('Rowing Machine'),
      instruction_en: `
1. Strap feet in and grab handle.
2. Push with legs, lean back slightly, pull handle to ribs.
3. Return arms first then legs.`,
      instruction_fa: `
۱. پاها را در جای مخصوص قرار دهید و دسته را بگیرید.
۲. با پاها فشار دهید، کمی به عقب متمایل شوید و دسته را به سینه بکشید.
۳. ابتدا دست‌ها و سپس پاها را به حالت شروع بازگردانید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.DISTANCE,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Running (Treadmill)',
      name_fa: 'دویدن روی تردمیل',
      slug: createSlug('Running Treadmill'),
      instruction_en: `
1. Start walking, gradually increase speed.
2. Maintain tall posture and controlled breathing.
3. Cool down after running.`,
      instruction_fa: `
۱. با راه رفتن شروع کنید و سرعت را افزایش دهید.
۲. بالا تنه صاف و تنفس کنترل‌شده.
۳. در پایان سرعت را کم کنید.`,
      equipment: EquipmentType.CARDIO_MACHINE,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.DISTANCE,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Russian Twist',
      name_fa: 'چرخش روسی',
      slug: createSlug('Russian Twist'),
      instruction_en: `
1. Sit with knees bent, lean slightly back.
2. Twist torso side to side.
3. Optional: hold weight/plate.`,
      instruction_fa: `
۱. بنشینید، زانوها خم، کمی به عقب متمایل شوید.
۲. بالا تنه را به چپ و راست بچرخانید.
۳. می‌توانید وزنه نیز بگیرید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CORE,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Seated Calf Raise (Machine)',
      name_fa: 'ساق پا نشسته (ماشین)',
      slug: createSlug('Seated Calf Raise Machine'),
      instruction_en: `
1. Sit on the calf raise machine and place the thighs under the pads.
2. Push through the balls of your feet to raise your heels.
3. Lower the heels slowly back to the starting point.`,
      instruction_fa: `
۱. روی دستگاه ساق پا بنشینید و ران‌ها را زیر پد قرار دهید.
۲. با فشار دادن پنجه پا پاشنه‌ها را بالا ببرید.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.CALVES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Seated Leg Curl (Machine)',
      name_fa: 'پشت ران نشسته (ماشین)',
      slug: createSlug('Seated Leg Curl Machine'),
      instruction_en: `
1. Sit on the machine and secure your legs behind the padded lever.
2. Curl your legs downward until fully flexed.
3. Slowly return to the start position.`,
      instruction_fa: `
۱. روی دستگاه بنشینید و پاها را پشت پد قرار دهید.
۲. پاها را به پایین جمع کنید تا عضله همسترینگ درگیر شود.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.HAMSTRINGS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Seated Leg Press (Machine)',
      name_fa: 'پرس پا نشسته (ماشین)',
      slug: createSlug('Seated Leg Press Machine'),
      instruction_en: `
1. Sit on the leg press machine with your feet shoulder-width apart.
2. Push the platform away until legs are extended.
3. Slowly bend knees and return to the starting position.`,
      instruction_fa: `
۱. روی دستگاه پرس پا بنشینید و پاها را به عرض شانه قرار دهید.
۲. پلتفرم را به سمت جلو فشار دهید تا پاها صاف شوند.
۳. به‌آرامی زانوها را خم کرده و به نقطه شروع برگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.QUADRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Seated Overhead Press (Barbell)',
      name_fa: 'پرس سرشانه نشسته (هالتر)',
      slug: createSlug('Seated Overhead Press Barbell'),
      instruction_en: `
1. Sit on a bench and hold the barbell at shoulder height.
2. Press it overhead until your arms are fully extended.
3. Lower the barbell back down to shoulder level.`,
      instruction_fa: `
۱. روی نیمکت بنشینید و هالتر را در ارتفاع شانه نگه دارید.
۲. هالتر را بالای سر پرس کنید تا دست‌ها کاملاً صاف شوند.
۳. به‌آرامی به سطح شانه بازگردید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Seated Overhead Press (Dumbbell)',
      name_fa: 'پرس سرشانه نشسته (دمبل)',
      slug: createSlug('Seated Overhead Press Dumbbell'),
      instruction_en: `
1. Sit upright holding dumbbells at shoulder height.
2. Press them overhead until arms are fully extended.
3. Slowly return to the starting position.`,
      instruction_fa: `
۱. صاف بنشینید و دمبل‌ها را در ارتفاع شانه نگه دارید.
۲. دمبل‌ها را به سمت بالا پرس کنید.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Seated Palms Up Wrist Curl (Dumbbell)',
      name_fa: 'لیفت مچ نشسته کف دست رو به بالا (دمبل)',
      slug: createSlug('Seated Palms Up Wrist Curl Dumbbell'),
      instruction_en: `
1. Sit on a bench and rest forearms on thighs with palms facing up.
2. Curl the dumbbells upward using your wrists only.
3. Lower the dumbbells slowly.`,
      instruction_fa: `
۱. روی نیمکت بنشینید و ساعدها را روی ران قرار دهید، کف دست‌ها رو به بالا.
۲. با حرکت مچ دمبل‌ها را بالا ببرید.
۳. به‌آرامی دمبل‌ها را پایین بیاورید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.ARMS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Seated Row (Cable)',
      name_fa: 'قایقی نشسته (سیم‌کش)',
      slug: createSlug('Seated Row Cable'),
      instruction_en: `
1. Sit on the cable row machine and grab the handle.
2. Pull the handle toward your torso while keeping back straight.
3. Extend arms slowly back to starting position.`,
      instruction_fa: `
۱. روی دستگاه قایقی بنشینید و دستگیره را بگیرید.
۲. دستگیره را به سمت بدن بکشید و پشت را صاف نگه دارید.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Seated Row (Machine)',
      name_fa: 'قایقی نشسته (ماشین)',
      slug: createSlug('Seated Row Machine'),
      instruction_en: `
1. Sit on the machine and grab the handles.
2. Pull the handles toward your body while keeping chest up.
3. Return slowly to starting point.`,
      instruction_fa: `
۱. روی دستگاه بنشینید و دستگیره‌ها را بگیرید.
۲. دستگیره‌ها را به سمت بدن بکشید و قفسه سینه را بالا نگه دارید.
۳. به‌آرامی بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Seated Wide-Grip Row (Cable)',
      name_fa: 'قایقی نشسته دست باز (سیم‌کش)',
      slug: createSlug('Seated Wide Grip Row Cable'),
      instruction_en: `
1. Sit on the cable row machine using a wide-grip bar.
2. Pull the bar toward your upper abdomen while keeping back straight.
3. Return slowly and maintain control.`,
      instruction_fa: `
۱. روی دستگاه قایقی بنشینید و میله دست‌ باز را بگیرید.
۲. میله را به سمت شکم بالا بکشید و پشت را صاف نگه دارید.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Shoulder External Rotation (Band)',
      name_fa: 'چرخش خارجی شانه (کش)',
      slug: createSlug('Shoulder External Rotation Band'),
      instruction_en: `
1. Attach a resistance band to a fixed point.
2. Hold the band with your elbow at 90 degrees, tucked at your side.
3. Rotate your arm outward slowly, keeping elbow stationary.
4. Return to the starting position.`,
      instruction_fa: `
۱. کش را به یک نقطه ثابت وصل کنید.
۲. کش را در حالی که آرنج ۹۰ درجه است و کنار بدن قرار دارد، بگیرید.
۳. بازو را به آرامی به سمت بیرون بچرخانید و آرنج ثابت بماند.
۴. به نقطه شروع بازگردید.`,
      equipment: EquipmentType.BAND,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Shoulder Press (Machine)',
      name_fa: 'پرس سرشانه (ماشین)',
      slug: createSlug('Shoulder Press Machine'),
      instruction_en: `
1. Sit on the shoulder press machine and grab the handles.
2. Press the handles upward until arms are fully extended.
3. Slowly return to the starting position.`,
      instruction_fa: `
۱. روی دستگاه پرس شانه بنشینید و دستگیره‌ها را بگیرید.
۲. دستگیره‌ها را به سمت بالا فشار دهید تا دست‌ها کاملاً صاف شوند.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Shoulder Press (Plate Loaded)',
      name_fa: 'پرس سرشانه (پلیت)',
      slug: createSlug('Shoulder Press Plate Loaded'),
      instruction_en: `
1. Sit on the plate-loaded shoulder press machine.
2. Press the handles upward until arms are extended.
3. Return slowly to starting position.`,
      instruction_fa: `
۱. روی دستگاه پرس شانه پلیت بنشینید.
۲. دستگیره‌ها را به سمت بالا فشار دهید تا دست‌ها صاف شوند.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Shrug (Barbell)',
      name_fa: 'شراگ (هالتر)',
      slug: createSlug('Shrug Barbell'),
      instruction_en: `
1. Hold a barbell with an overhand grip in front of your thighs.
2. Shrug your shoulders as high as possible.
3. Lower slowly back to start.`,
      instruction_fa: `
۱. هالتر را با گرفتن از بالا جلوی ران‌ها نگه دارید.
۲. شانه‌ها را تا بالاترین حد بالا ببرید.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Shrug (Dumbbell)',
      name_fa: 'شراگ (دمبل)',
      slug: createSlug('Shrug Dumbbell'),
      instruction_en: `
1. Hold a dumbbell in each hand at your sides.
2. Shrug your shoulders as high as possible.
3. Slowly lower back to start.`,
      instruction_fa: `
۱. دمبل‌ها را در دو طرف بدن نگه دارید.
۲. شانه‌ها را تا بالاترین حد بالا ببرید.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Shrug (Machine)',
      name_fa: 'شراگ (ماشین)',
      slug: createSlug('Shrug Machine'),
      instruction_en: `
1. Sit on the shrug machine and grasp the handles.
2. Shrug shoulders up as high as possible.
3. Slowly lower to start position.`,
      instruction_fa: `
۱. روی دستگاه شراگ بنشینید و دستگیره‌ها را بگیرید.
۲. شانه‌ها را تا بالاترین حد بالا ببرید.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Shrug (Smith Machine)',
      name_fa: 'شراگ (اسمیت ماشین)',
      slug: createSlug('Shrug Smith Machine'),
      instruction_en: `
1. Stand under the Smith machine bar with feet shoulder-width apart.
2. Shrug shoulders as high as possible.
3. Slowly lower back to start.`,
      instruction_fa: `
۱. زیر میله اسمیت بایستید و پاها را به عرض شانه قرار دهید.
۲. شانه‌ها را تا بالاترین حد بالا ببرید.
۳. به‌آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Side Bend (Band)',
      name_fa: 'خم شدن جانبی (کش)',
      slug: createSlug('Side Bend Band'),
      instruction_en: `
1. Stand with one end of the band under your feet and hold the other end overhead.
2. Slowly bend sideways, lowering the band along your body.
3. Return to upright position.`,
      equipment: EquipmentType.BAND,
      muscle_group: MuscleGroup.OBLIQUES || MuscleGroup.CORE,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      instruction_fa: `
۱. یکی از سرهای کش را زیر پاها قرار دهید و سر دیگر را بالای سر نگه دارید.
۲. به آرامی به سمت جانبی خم شوید و کش را روی بدن پایین بیاورید.
۳. به حالت ایستاده بازگردید.`,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Side Bend (Cable)',
      name_fa: 'خم شدن جانبی (سیم‌کش)',
      slug: createSlug('Side Bend Cable'),
      instruction_en: `
1. Stand next to a cable machine with the handle in your top hand.
2. Slowly bend sideways, pulling the cable down along your body.
3. Return to upright position.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.OBLIQUES || MuscleGroup.CORE,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      instruction_fa: `
۱. کنار دستگاه سیم‌کش بایستید و دست بالایی را روی دستگیره قرار دهید.
۲. به آرامی به سمت جانبی خم شوید و کابل را روی بدن پایین بکشید.
۳. به حالت ایستاده بازگردید.`,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Side Bend (Dumbbell)',
      name_fa: 'خم شدن جانبی (دمبل)',
      slug: createSlug('Side Bend Dumbbell'),
      instruction_en: `
1. Hold a dumbbell in one hand at your side.
2. Slowly bend sideways towards the dumbbell.
3. Return to upright position.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.OBLIQUES || MuscleGroup.CORE,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      instruction_fa: `
۱. دمبل را در یک دست کنار بدن نگه دارید.
۲. به آرامی به سمت دمبل خم شوید.
۳. به حالت ایستاده بازگردید.`,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Side Plank',
      name_fa: 'پلانک جانبی',
      slug: createSlug('Side Plank'),
      instruction_en: `
1. Lie on your side with elbow directly under shoulder.
2. Lift hips off the ground to form a straight line.
3. Hold position for desired duration.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CORE,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      instruction_fa: `
۱. به پهلو دراز بکشید و آرنج زیر شانه باشد.
۲. باسن را از زمین بلند کنید تا خطی صاف ایجاد شود.
۳. موقعیت را برای مدت زمان مورد نظر نگه دارید.`,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Single Leg Bridge',
      name_fa: 'پل تک پا',
      slug: createSlug('Single Leg Bridge'),
      instruction_en: `
1. Lie on your back with one knee bent and foot on floor.
2. Extend other leg and lift hips to form a straight line.
3. Lower hips slowly and repeat.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.GLUTES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      instruction_fa: `
۱. به پشت دراز بکشید، یک زانو خم و پا روی زمین باشد.
۲. پای دیگر را صاف کنید و باسن را بالا ببرید تا خطی صاف ایجاد شود.
۳. به آرامی پایین آمده و تکرار کنید.`,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Sit Up',
      name_fa: 'دراز نشست',
      slug: createSlug('Sit Up'),
      instruction_en: `
1. Lie on your back with knees bent.
2. Place hands behind your head or crossed on chest.
3. Lift torso toward knees and slowly return.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.ABS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      instruction_fa: `
۱. به پشت دراز بکشید و زانوها را خم کنید.
۲. دست‌ها را پشت سر یا روی سینه قرار دهید.
۳. تنه را به سمت زانوها بلند کرده و به آرامی بازگردید.`,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Skating',
      name_fa: 'اسکیتینگ',
      slug: createSlug('Skating'),
      instruction_en: `
1. Stand with feet shoulder-width apart.
2. Push off one foot laterally and land on the other foot.
3. Continue side-to-side hopping in a skating motion.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      instruction_fa: `
۱. پاها را به عرض شانه باز کنید.
۲. با یک پا به سمت جانبی فشار دهید و روی پای دیگر فرود آیید.
۳. حرکات جانبی را به صورت اسکیتینگ ادامه دهید.`,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Skiing',
      name_fa: 'اسکی روی زمین',
      slug: createSlug('Skiing'),
      instruction_en: `
1. Stand with feet together, bend knees slightly.
2. Jump laterally side-to-side, simulating skiing motion.
3. Keep arms moving in coordination with legs.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      instruction_fa: `
۱. پاها را کنار هم بگذارید و کمی زانوها را خم کنید.
۲. به صورت جانبی بپرید، شبیه حرکت اسکی.
۳. دست‌ها را با پاها هماهنگ حرکت دهید.`,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Skullcrusher (Barbell)',
      name_fa: 'اسکال کراشر (هالتر)',
      slug: createSlug('Skullcrusher Barbell'),
      instruction_en: `
1. Lie on a flat bench holding a barbell with hands shoulder-width apart.
2. Lower the bar toward your forehead by bending elbows.
3. Extend arms back to starting position.`,
      instruction_fa: `
۱. روی نیمکت صاف دراز بکشید و هالتر را با فاصله شانه‌ها بگیرید.
۲. هالتر را با خم کردن آرنج به سمت پیشانی پایین بیاورید.
۳. بازوها را صاف کرده و به نقطه شروع بازگردید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.TRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Skullcrusher (Dumbbell)',
      name_fa: 'اسکال کراشر (دمبل)',
      slug: createSlug('Skullcrusher Dumbbell'),
      instruction_en: `
1. Lie on a flat bench holding a dumbbell in each hand over chest.
2. Lower dumbbells toward temples by bending elbows.
3. Extend arms back to start position.`,
      instruction_fa: `
۱. روی نیمکت صاف دراز بکشید و دمبل‌ها را بالای سینه نگه دارید.
۲. دمبل‌ها را با خم کردن آرنج به سمت شقیقه‌ها پایین بیاورید.
۳. بازوها را صاف کرده و به نقطه شروع بازگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.TRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Snatch (Barbell)',
      name_fa: 'اسنچ (هالتر)',
      slug: createSlug('Snatch Barbell'),
      instruction_en: `
1. Stand with feet hip-width apart, barbell on floor.
2. Explosively lift bar overhead in one motion.
3. Lock arms overhead and stand tall.`,
      instruction_fa: `
۱. پاها را به عرض لگن باز کنید و هالتر روی زمین باشد.
۲. هالتر را به صورت انفجاری بالای سر بلند کنید.
۳. بازوها را قفل کرده و صاف بایستید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.EXPERT,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Snatch Pull (Barbell)',
      name_fa: 'اسنچ پول (هالتر)',
      slug: createSlug('Snatch Pull Barbell'),
      instruction_en: `
1. Stand with feet hip-width apart, barbell on floor.
2. Pull barbell explosively to upper thighs keeping elbows straight.
3. Lower barbell back to start.`,
      instruction_fa: `
۱. پاها را به عرض لگن باز کنید و هالتر روی زمین باشد.
۲. هالتر را به صورت انفجاری تا بالای ران‌ها بکشید، آرنج‌ها صاف.
۳. هالتر را به نقطه شروع بازگردانید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.EXPERT,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Snowboarding',
      name_fa: 'اسنوبوردینگ',
      slug: createSlug('Snowboarding'),
      instruction_en: `
1. Stand on a snowboard with feet strapped in.
2. Shift weight to steer left or right.
3. Maintain balance and slide down slope safely.`,
      instruction_fa: `
۱. روی اسنوبورد بایستید و پاها را محکم ببندید.
۲. وزن خود را برای هدایت به چپ یا راست منتقل کنید.
۳. تعادل را حفظ کرده و به آرامی پایین شیب حرکت کنید.`,
      equipment: EquipmentType.OTHER,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Split Jerk (Barbell)',
      name_fa: 'اسپلیت جرک (هالتر)',
      slug: createSlug('Split Jerk Barbell'),
      instruction_en: `
1. Hold barbell at shoulder level.
2. Dip slightly, then explosively drive bar overhead while splitting legs.
3. Lock arms and return feet to parallel stance.`,
      instruction_fa: `
۱. هالتر را در سطح شانه نگه دارید.
۲. کمی خم شوید و سپس هالتر را به صورت انفجاری بالای سر بزنید و پاها را باز کنید.
۳. بازوها را قفل کرده و پاها را به حالت موازی بازگردانید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.EXPERT,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Squat (Band)',
      name_fa: 'اسکوات (کش)',
      slug: createSlug('Squat Band'),
      instruction_en: `
1. Place resistance band under feet and over shoulders.
2. Perform a squat by bending knees and hips.
3. Return to standing position.`,
      instruction_fa: `
۱. کش را زیر پاها و روی شانه‌ها قرار دهید.
۲. با خم کردن زانو و باسن، اسکوات انجام دهید.
۳. به حالت ایستاده بازگردید.`,
      equipment: EquipmentType.BAND,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Squat (Barbell)',
      name_fa: 'اسکوات (هالتر)',
      slug: createSlug('Squat Barbell'),
      instruction_en: `
1. Place barbell across shoulders behind neck.
2. Lower into a squat until thighs are parallel to floor.
3. Push through heels to stand.`,
      instruction_fa: `
۱. هالتر را پشت شانه‌ها قرار دهید.
۲. به حالت اسکوات پایین بروید تا ران‌ها موازی زمین شوند.
۳. با فشار روی پاشنه به حالت ایستاده بازگردید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Squat (Dumbbell)',
      name_fa: 'اسکوات (دمبل)',
      slug: createSlug('Squat Dumbbell'),
      instruction_en: `
1. Hold a dumbbell in each hand at your sides or shoulders.
2. Lower into squat until thighs parallel to floor.
3. Push through heels to stand.`,
      instruction_fa: `
۱. دمبل‌ها را در دو طرف یا روی شانه‌ها نگه دارید.
۲. به حالت اسکوات پایین بروید تا ران‌ها موازی زمین شوند.
۳. با فشار روی پاشنه به حالت ایستاده بازگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Squat (Machine)',
      name_fa: 'اسکوات (ماشین)',
      slug: createSlug('Squat Machine'),
      instruction_en: `
1. Sit on the squat machine and place feet on platform.
2. Lower weight by bending knees and hips.
3. Push through heels to return to start.`,
      instruction_fa: `
۱. روی دستگاه اسکوات بنشینید و پاها را روی پلتفرم قرار دهید.
۲. با خم کردن زانو و باسن، وزنه را پایین بیاورید.
۳. با فشار روی پاشنه به نقطه شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Squat (Smith Machine)',
      name_fa: 'اسکوات (اسمیت ماشین)',
      slug: createSlug('Squat Smith Machine'),
      instruction_en: `
1. Stand under Smith machine bar with feet shoulder-width apart.
2. Lower into squat keeping bar on shoulders.
3. Push through heels to return to standing.`,
      instruction_fa: `
۱. زیر میله اسمیت بایستید و پاها را به عرض شانه باز کنید.
۲. به حالت اسکوات پایین بروید و میله را روی شانه‌ها نگه دارید.
۳. با فشار روی پاشنه به حالت ایستاده بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Squat Row (Band)',
      name_fa: 'اسکوات رو (کش)',
      slug: createSlug('Squat Row Band'),
      instruction_en: `
1. Stand on a resistance band holding ends with hands.
2. Perform a squat while pulling the band towards chest.
3. Return to starting position.`,
      instruction_fa: `
۱. روی کش بایستید و انتهای آن را با دست‌ها بگیرید.
۲. همزمان با اسکوات، کش را به سمت سینه بکشید.
۳. به نقطه شروع بازگردید.`,
      equipment: EquipmentType.BAND,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Standing Calf Raise (Bodyweight)',
      name_fa: 'کالف ریز ایستاده (وزن بدن)',
      slug: createSlug('Standing Calf Raise Bodyweight'),
      instruction_en: `
1. Stand upright with feet shoulder-width apart.
2. Raise heels as high as possible.
3. Slowly lower back to starting position.`,
      instruction_fa: `
۱. صاف بایستید و پاها را به عرض شانه باز کنید.
۲. پاشنه‌ها را تا حد امکان بالا ببرید.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CALVES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Standing Calf Raise (Dumbbell)',
      name_fa: 'کالف ریز ایستاده (دمبل)',
      slug: createSlug('Standing Calf Raise Dumbbell'),
      instruction_en: `
1. Hold a dumbbell in each hand at your sides.
2. Raise heels as high as possible.
3. Lower back slowly to starting position.`,
      instruction_fa: `
۱. دمبل‌ها را در دو طرف بدن نگه دارید.
۲. پاشنه‌ها را تا حد امکان بالا ببرید.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.CALVES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Standing Calf Raise (Machine)',
      name_fa: 'کالف ریز ایستاده (ماشین)',
      slug: createSlug('Standing Calf Raise Machine'),
      instruction_en: `
1. Stand on the machine platform with shoulders under pads.
2. Raise heels as high as possible.
3. Lower slowly to starting position.`,
      instruction_fa: `
۱. روی پلتفرم دستگاه بایستید و شانه‌ها را زیر پدها قرار دهید.
۲. پاشنه‌ها را تا حد امکان بالا ببرید.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.CALVES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Standing Calf Raise (Smith Machine)',
      name_fa: 'کالف ریز ایستاده (اسمیت ماشین)',
      slug: createSlug('Standing Calf Raise Smith Machine'),
      instruction_en: `
1. Stand under Smith machine bar with feet on platform.
2. Raise heels as high as possible.
3. Lower slowly back to start position.`,
      instruction_fa: `
۱. زیر میله اسمیت بایستید و پاها را روی پلتفرم قرار دهید.
۲. پاشنه‌ها را تا حد امکان بالا ببرید.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.CALVES,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Step-Up',
      name_fa: 'استپ آپ',
      slug: createSlug('Step Up'),
      instruction_en: `
1. Stand in front of a bench or step.
2. Step one foot onto the bench, push through the heel.
3. Bring the other foot up and step back down.`,
      instruction_fa: `
۱. روبروی یک نیمکت یا سکوی کوتاه بایستید.
۲. یک پا را روی نیمکت قرار دهید و از پاشنه فشار دهید.
۳. پای دیگر را بالا آورده و دوباره پایین بیایید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Stiff Leg Deadlift (Barbell)',
      name_fa: 'ددلیفت پا صاف (هالتر)',
      slug: createSlug('Stiff Leg Deadlift Barbell'),
      instruction_en: `
1. Hold a barbell in front of thighs.
2. Keep legs straight and hinge at hips to lower bar.
3. Return to standing position.`,
      instruction_fa: `
۱. هالتر را جلوی ران‌ها نگه دارید.
۲. پاها را صاف نگه داشته و از باسن خم شوید تا هالتر پایین بیاید.
۳. به حالت ایستاده بازگردید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.HAMSTRINGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Stiff Leg Deadlift (Dumbbell)',
      name_fa: 'ددلیفت پا صاف (دمبل)',
      slug: createSlug('Stiff Leg Deadlift Dumbbell'),
      instruction_en: `
1. Hold a dumbbell in each hand in front of thighs.
2. Keep legs straight and hinge at hips to lower dumbbells.
3. Return to standing position.`,
      instruction_fa: `
۱. دمبل‌ها را جلوی ران‌ها نگه دارید.
۲. پاها را صاف نگه داشته و از باسن خم شوید تا دمبل‌ها پایین بیایند.
۳. به حالت ایستاده بازگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.HAMSTRINGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Straight Leg Deadlift (Band)',
      name_fa: 'ددلیفت پا صاف (کش)',
      slug: createSlug('Straight Leg Deadlift Band'),
      instruction_en: `
1. Stand on a resistance band holding ends.
2. Keep legs straight and hinge at hips to lower.
3. Return to upright position.`,
      instruction_fa: `
۱. روی کش بایستید و انتهای آن را با دست‌ها بگیرید.
۲. پاها را صاف نگه داشته و از باسن خم شوید.
۳. به حالت ایستاده بازگردید.`,
      equipment: EquipmentType.BAND,
      muscle_group: MuscleGroup.HAMSTRINGS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Stretching',
      name_fa: 'کشش',
      slug: createSlug('Stretching'),
      instruction_en: `
1. Perform a variety of stretches targeting all major muscle groups.
2. Hold each stretch for 15–30 seconds.
3. Repeat as needed.`,
      instruction_fa: `
۱. انواع کشش‌ها برای گروه‌های عضلانی اصلی انجام دهید.
۲. هر کشش را ۱۵–۳۰ ثانیه نگه دارید.
۳. در صورت نیاز تکرار کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.OTHER,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Strict Military Press (Barbell)',
      name_fa: 'پرس نظامی سخت (هالتر)',
      slug: createSlug('Strict Military Press Barbell'),
      instruction_en: `
1. Hold barbell at shoulder height.
2. Press overhead until arms are fully extended.
3. Lower bar slowly to shoulders.`,
      instruction_fa: `
۱. هالتر را در ارتفاع شانه نگه دارید.
۲. به بالا فشار دهید تا بازوها کاملاً صاف شوند.
۳. هالتر را به آرامی به شانه‌ها بازگردانید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Strict Military Press (Dumbbell)',
      name_fa: 'پرس نظامی سخت (دمبل)',
      slug: createSlug('Strict Military Press Dumbbell'),
      instruction_en: `
1. Hold a dumbbell in each hand at shoulder height.
2. Press overhead until arms are fully extended.
3. Lower dumbbells slowly to shoulders.`,
      instruction_fa: `
۱. دمبل‌ها را در ارتفاع شانه نگه دارید.
۲. به بالا فشار دهید تا بازوها کاملاً صاف شوند.
۳. دمبل‌ها را به آرامی به شانه‌ها بازگردانید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Sumo Deadlift (Barbell)',
      name_fa: 'ددلیفت سومو (هالتر)',
      slug: createSlug('Sumo Deadlift Barbell'),
      instruction_en: `
1. Stand with feet wide, toes slightly out, barbell on floor.
2. Grip bar and lift by extending hips and knees.
3. Lower back to floor with control.`,
      instruction_fa: `
۱. پاها را باز کنید و انگشتان کمی بیرون، هالتر روی زمین.
۲. هالتر را بگیرید و با صاف کردن باسن و زانوها بلند کنید.
۳. به آرامی به زمین بازگردید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.HAMSTRINGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Sumo Deadlift High Pull (Barbell)',
      name_fa: 'ددلیفت سومو با پول بالا (هالتر)',
      slug: createSlug('Sumo Deadlift High Pull Barbell'),
      instruction_en: `
1. Stand in sumo stance with barbell on floor.
2. Pull bar to chin while extending hips and knees explosively.
3. Lower bar to floor with control.`,
      instruction_fa: `
۱. در حالت سومو بایستید و هالتر روی زمین.
۲. هالتر را تا چانه بکشید در حالی که باسن و زانوها را به صورت انفجاری صاف می‌کنید.
۳. هالتر را با کنترل به زمین بازگردانید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.EXPERT,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Superman',
      name_fa: 'سوپرمن',
      slug: createSlug('Superman'),
      instruction_en: `
1. Lie face down on the floor.
2. Lift arms, chest, and legs off the floor simultaneously.
3. Hold briefly and return to start.`,
      instruction_fa: `
۱. روی شکم دراز بکشید.
۲. همزمان دست‌ها، سینه و پاها را از زمین بلند کنید.
۳. کمی نگه دارید و به نقطه شروع بازگردید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Swimming',
      name_fa: 'شنا',
      slug: createSlug('Swimming'),
      instruction_en: `
1. Perform any swimming stroke in water.
2. Maintain a steady rhythm and breathing pattern.
3. Continue for desired duration or distance.`,
      instruction_fa: `
۱. هر نوع حرکت شنای دلخواه در آب انجام دهید.
۲. ریتم و تنفس را حفظ کنید.
۳. برای مدت زمان یا مسافت دلخواه ادامه دهید.`,
      equipment: EquipmentType.OTHER,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'T Bar Row',
      name_fa: 'تی بار رو',
      slug: createSlug('T Bar Row'),
      instruction_en: `
1. Stand over T-bar with feet shoulder-width apart.
2. Grip handles and row the bar toward your chest.
3. Lower slowly to starting position.`,
      instruction_fa: `
۱. روبروی تی بار بایستید و پاها را به عرض شانه باز کنید.
۲. دسته‌ها را بگیرید و بار را به سمت سینه بکشید.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Thruster (Barbell)',
      name_fa: 'ترستر (هالتر)',
      slug: createSlug('Thruster Barbell'),
      instruction_en: `
1. Hold barbell at shoulder height.
2. Perform a front squat.
3. As you stand, press the barbell overhead.`,
      instruction_fa: `
۱. هالتر را در ارتفاع شانه نگه دارید.
۲. اسکوات جلو انجام دهید.
۳. هنگام ایستادن، هالتر را بالای سر فشار دهید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Thruster (Kettlebell)',
      name_fa: 'ترستر (کتل بل)',
      slug: createSlug('Thruster Kettlebell'),
      instruction_en: `
1. Hold a kettlebell in each hand at shoulder height.
2. Perform a front squat.
3. Press kettlebells overhead as you stand.`,
      instruction_fa: `
۱. کتل بل را در هر دست در ارتفاع شانه نگه دارید.
۲. اسکوات جلو انجام دهید.
۳. هنگام ایستادن، کتل بل‌ها را بالای سر فشار دهید.`,
      equipment: EquipmentType.KETTLEBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Toes to Bar',
      name_fa: 'انگشتان پا تا میله',
      slug: createSlug('Toes to Bar'),
      instruction_en: `
1. Hang from a pull-up bar.
2. Raise your legs to touch the bar with your toes.
3. Lower legs slowly to start position.`,
      instruction_fa: `
۱. از میله بارفیکس آویزان شوید.
۲. پاها را بالا آورده و با انگشتان به میله برسید.
۳. پاها را به آرامی به نقطه شروع بازگردانید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.CORE,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.ADVANCED,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Torso Rotation (Machine)',
      name_fa: 'چرخش تنه (دستگاه)',
      slug: createSlug('Torso Rotation Machine'),
      instruction_en: `
1. Sit on the machine with feet flat.
2. Grip handles and rotate torso side to side.
3. Return slowly to center position.`,
      instruction_fa: `
۱. روی دستگاه بنشینید و پاها را صاف روی زمین بگذارید.
۲. دسته‌ها را گرفته و تنه را به طرفین بچرخانید.
۳. به آرامی به مرکز بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.ABS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Trap Bar Deadlift',
      name_fa: 'ددلیفت با تراپ بار',
      slug: createSlug('Trap Bar Deadlift'),
      instruction_en: `
1. Stand inside the trap bar.
2. Grip handles and lift bar by extending hips and knees.
3. Lower back to floor with control.`,
      instruction_fa: `
۱. داخل تراپ بار بایستید.
۲. دسته‌ها را گرفته و با صاف کردن باسن و زانوها بار را بلند کنید.
۳. به آرامی به زمین بازگردید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Triceps Dip',
      name_fa: 'دیپ پشت بازو',
      slug: createSlug('Triceps Dip'),
      instruction_en: `
1. Place hands on parallel bars and lift body.
2. Lower body by bending elbows.
3. Push back up to starting position.`,
      instruction_fa: `
۱. دست‌ها را روی بارهای موازی قرار داده و بدن را بلند کنید.
۲. بدن را با خم کردن آرنج پایین بیاورید.
۳. به نقطه شروع فشار دهید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.TRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Triceps Dip (Assisted Bodyweight)',
      name_fa: 'دیپ پشت بازو (کمک وزنه بدن)',
      slug: createSlug('Triceps Dip Assisted Bodyweight'),
      instruction_en: `
1. Use assisted dip machine to reduce body weight.
2. Lower elbows to bend body.
3. Push back to starting position.`,
      instruction_fa: `
۱. از دستگاه دیپ کمکی استفاده کنید تا وزن بدن کاهش یابد.
۲. آرنج‌ها را خم کرده و بدن را پایین بیاورید.
۳. به نقطه شروع فشار دهید.`,
      equipment: EquipmentType.ASSISTED_BODY_WEIGHT,
      muscle_group: MuscleGroup.TRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Triceps Dip (Machine)',
      name_fa: 'دیپ پشت بازو (دستگاه)',
      slug: createSlug('Triceps Dip Machine'),
      instruction_en: `
1. Sit on triceps dip machine and grip handles.
2. Lower body slowly by bending elbows.
3. Push back to starting position.`,
      instruction_fa: `
۱. روی دستگاه دیپ پشت بازو بنشینید و دسته‌ها را بگیرید.
۲. بدن را با خم کردن آرنج‌ها به آرامی پایین بیاورید.
۳. به نقطه شروع فشار دهید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.TRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Triceps Extension',
      name_fa: 'پشت بازو سیم کش',
      slug: createSlug('Triceps Extension'),
      instruction_en: `
1. Hold a dumbbell or bar overhead.
2. Lower weight behind head by bending elbows.
3. Extend arms back to start.`,
      instruction_fa: `
۱. دمبل یا هالتر را بالای سر نگه دارید.
۲. با خم کردن آرنج، وزنه را پشت سر پایین بیاورید.
۳. بازوها را به نقطه شروع صاف کنید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.TRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Triceps Extension (Barbell)',
      name_fa: 'پشت بازو هالتر',
      slug: createSlug('Triceps Extension Barbell'),
      instruction_en: `
1. Hold barbell overhead with arms straight.
2. Lower behind head by bending elbows.
3. Press bar back up to start.`,
      instruction_fa: `
۱. هالتر را بالای سر با دست‌های صاف نگه دارید.
۲. با خم کردن آرنج، پشت سر را پایین بیاورید.
۳. هالتر را به نقطه شروع فشار دهید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.TRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Triceps Extension (Cable)',
      name_fa: 'پشت بازو سیم کش',
      slug: createSlug('Triceps Extension Cable'),
      instruction_en: `
1. Attach rope to cable machine.
2. Pull down by extending elbows.
3. Return slowly to start.`,
      instruction_fa: `
۱. طناب را به دستگاه سیم کش وصل کنید.
۲. با صاف کردن آرنج، پایین بکشید.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.TRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Triceps Extension (Dumbbell)',
      name_fa: 'پشت بازو دمبل',
      slug: createSlug('Triceps Extension Dumbbell'),
      instruction_en: `
1. Hold a dumbbell overhead with both hands.
2. Lower behind head by bending elbows.
3. Extend arms back to start.`,
      instruction_fa: `
۱. دمبل را با هر دو دست بالای سر نگه دارید.
۲. با خم کردن آرنج پشت سر پایین بیاورید.
۳. بازوها را به نقطه شروع صاف کنید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.TRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Triceps Extension (Machine)',
      name_fa: 'پشت بازو دستگاه',
      slug: createSlug('Triceps Extension Machine'),
      instruction_en: `
1. Sit on machine, grip handles.
2. Extend elbows to push weight down.
3. Return slowly to start.`,
      instruction_fa: `
۱. روی دستگاه بنشینید و دسته‌ها را بگیرید.
۲. آرنج‌ها را صاف کرده و وزنه را پایین فشار دهید.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.MACHINE,
      muscle_group: MuscleGroup.TRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Triceps Pushdown (Cable)',
      name_fa: 'پشت بازو پرس پایین (سیم کش)',
      slug: createSlug('Triceps Pushdown Cable'),
      instruction_en: `
1. Attach bar/rope to high pulley.
2. Push down by extending elbows.
3. Slowly return to starting position.`,
      instruction_fa: `
۱. میله یا طناب را به پولی بالا وصل کنید.
۲. با صاف کردن آرنج، پایین فشار دهید.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.TRICEPS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Upright Row (Barbell)',
      name_fa: 'رو به بالا (هالتر)',
      slug: createSlug('Upright Row Barbell'),
      instruction_en: `
1. Stand with feet shoulder-width apart holding a barbell.
2. Pull the barbell vertically to chest height keeping elbows out.
3. Lower slowly to starting position.`,
      instruction_fa: `
۱. با فاصله شانه‌ها بایستید و هالتر را در دست بگیرید.
۲. هالتر را به صورت عمودی تا ارتفاع سینه بکشید و آرنج‌ها را بیرون نگه دارید.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Upright Row (Cable)',
      name_fa: 'رو به بالا (سیم‌کش)',
      slug: createSlug('Upright Row Cable'),
      instruction_en: `
1. Attach a straight bar to a low cable pulley.
2. Pull bar upward to chest height keeping elbows out.
3. Slowly return to start position.`,
      instruction_fa: `
۱. میله صاف را به پولی پایین دستگاه سیم‌کش وصل کنید.
۲. میله را به سمت بالا تا ارتفاع سینه بکشید و آرنج‌ها را بیرون نگه دارید.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.CABLE,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Upright Row (Dumbbell)',
      name_fa: 'رو به بالا (دمبل)',
      slug: createSlug('Upright Row Dumbbell'),
      instruction_en: `
1. Hold a dumbbell in each hand at thighs.
2. Pull dumbbells vertically to chest height keeping elbows out.
3. Lower slowly to starting position.`,
      instruction_fa: `
۱. دمبل‌ها را در هر دست کنار ران‌ها نگه دارید.
۲. دمبل‌ها را به صورت عمودی تا ارتفاع سینه بکشید و آرنج‌ها را بیرون نگه دارید.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.DUMBBELL,
      muscle_group: MuscleGroup.SHOULDERS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'V-Up',
      name_fa: 'وی آپ',
      slug: createSlug('V Up'),
      instruction_en: `
1. Lie flat on your back with arms overhead.
2. Lift legs and torso simultaneously to touch hands to toes.
3. Lower back slowly to start position.`,
      instruction_fa: `
۱. به پشت روی زمین دراز بکشید و دست‌ها را بالای سر قرار دهید.
۲. همزمان پاها و تنه را بالا آورده و دست‌ها را به انگشتان پا برسانید.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.ABS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Walking',
      name_fa: 'پیاده‌روی',
      slug: createSlug('Walking'),
      instruction_en: `
1. Walk at a comfortable pace for desired distance or time.`,
      instruction_fa: `
۱. با سرعت راحت برای مسافت یا زمان مورد نظر راه بروید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.DISTANCE,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Walking Angles',
      name_fa: 'پیاده‌روی با زاویه',
      slug: createSlug('Walking Angles'),
      instruction_en: `
1. Walk forward or backward at an angle.
2. Maintain posture and controlled steps.`,
      instruction_fa: `
۱. به جلو یا عقب با زاویه مشخص حرکت کنید.
۲. وضعیت بدن و قدم‌ها را کنترل کنید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.DISTANCE,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Wide Pull-Up',
      name_fa: 'بارفیکس دست باز',
      slug: createSlug('Wide Pull Up'),
      instruction_en: `
1. Grip pull-up bar wider than shoulders.
2. Pull body up until chin is above bar.
3. Lower back slowly to start position.`,
      instruction_fa: `
۱. میله بارفیکس را با فاصله بیشتر از عرض شانه بگیرید.
۲. بدن را بالا بیاورید تا چانه بالای میله قرار گیرد.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.BACK,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.INTERMEDIATE,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Wrist Roller',
      name_fa: 'چرخش مچ دست',
      slug: createSlug('Wrist Roller'),
      instruction_en: `
1. Hold a wrist roller with both hands.
2. Roll weight up and down with controlled movement.`,
      instruction_fa: `
۱. چرخش مچ دست را با هر دو دست نگه دارید.
۲. وزنه را به آرامی بالا و پایین بچرخانید.`,
      equipment: EquipmentType.OTHER,
      muscle_group: MuscleGroup.ARMS,
      metric_type: MetricType.REPS,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Yoga',
      name_fa: 'یوگا',
      slug: createSlug('Yoga'),
      instruction_en: `
1. Perform various yoga poses to stretch and strengthen muscles.`,
      instruction_fa: `
۱. حرکات مختلف یوگا را برای کشش و تقویت عضلات انجام دهید.`,
      equipment: EquipmentType.BODYWEIGHT,
      muscle_group: MuscleGroup.FULL_BODY,
      metric_type: MetricType.DURATION,
      difficulty: DifficultyLevel.BEGINNER,
      video_link: '',
      image: '',
      image_key: '',
    },
    {
      name_en: 'Zercher Squat (Barbell)',
      name_fa: 'اسکوات زرشِر (هالتر)',
      slug: createSlug('Zercher Squat Barbell'),
      instruction_en: `
1. Hold the barbell in the crook of your elbows.
2. Perform a squat while keeping chest up and back straight.
3. Return to starting position slowly.`,
      instruction_fa: `
۱. هالتر را در خم آرنج‌ها نگه دارید.
۲. اسکوات انجام دهید در حالی که سینه بالا و پشت صاف باشد.
۳. به آرامی به نقطه شروع بازگردید.`,
      equipment: EquipmentType.BARBELL,
      muscle_group: MuscleGroup.LEGS,
      metric_type: MetricType.WEIGHT,
      difficulty: DifficultyLevel.ADVANCED,
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
