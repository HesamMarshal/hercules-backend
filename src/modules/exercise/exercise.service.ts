import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, ILike } from 'typeorm';
import { ExerciseEntity } from './entities/exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExerciseMessage } from './message/message.enum';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { paginationSolver } from '../../common/utility/pagination.util';
import { S3Service } from '../S3/s3.service';
import { createSlug, randomId } from '../../common/utility/function.utils';
import { Lang } from '../../common/enum/language.enum';
import { validateImageFile } from '../../common/utility/image.utils';
import { MuscleGroup } from './enums/muscleGroup.enum';
import { EquipmentType } from './enums/equipment.enum';
import { MetricType } from 'aws-sdk/clients/applicationautoscaling';
import { DifficultyLevel } from './enums/difficulty.enum';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,

    private readonly s3Service: S3Service,
  ) {}

  // 🔹 Get all exercises (with pagination)
  async findAll(paginationDto: PaginationDto, lang: Lang) {
    const { limit, page, skip } = paginationSolver(paginationDto);

    const [exercises, total] = await this.exerciseRepository.findAndCount({
      order: { name_en: 'ASC' },
      skip,
      take: limit,
    });

    return {
      message: ExerciseMessage.Found,
      data: exercises,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // 🔹 Find exercise by ID
  async findOne(id: number) {
    const exercise = await this.exerciseRepository.findOneBy({ id });
    if (!exercise) throw new NotFoundException(ExerciseMessage.NotFound);
    return { data: exercise, message: ExerciseMessage.Found };
  }

  // 🔹 Find by slug
  async findOneBySlug(slug: string) {
    const exercise = await this.exerciseRepository.findOneBy({ slug });
    if (!exercise) throw new NotFoundException(ExerciseMessage.NotFound);
    return { data: exercise, message: ExerciseMessage.Found };
  }

  // 🔹 Search by name (EN or FA)
  async findByName(name: string) {
    const exercise = await this.exerciseRepository.findOne({
      where: [{ name_en: ILike(`%${name}%`) }, { name_fa: ILike(`%${name}%`) }],
    });

    if (!exercise)
      throw new NotFoundException(`Exercise with name "${name}" not found`);

    return { data: exercise, message: ExerciseMessage.Found };
  }

  // 🔹 Create exercise
  async create(
    createExerciseDto: CreateExerciseDto,
    image?: Express.Multer.File,
  ) {
    let {
      name_en,
      name_fa,
      slug,
      instruction_en,
      instruction_fa,
      equipment,
      muscle_group,
      metric_type,
      difficulty,
      video_link,
    } = createExerciseDto;

    // ✅ Create unique slug
    let slugBase = slug ?? name_en;
    slug = createSlug(slugBase);

    if (await this.checkBySlug(slug)) slug += `-${randomId()}`;

    // ✅ Handle image upload (optional)
    let uploadedImage: { Location?: string; Key?: string } = {};
    if (image) {
      validateImageFile(image);
      const s3Folder = process.env.S3_PROJECT_FOLDER || 'exercises';
      uploadedImage = await this.s3Service.uploadFile(image, s3Folder);
    }

    // ✅ Create and save
    const exercise = this.exerciseRepository.create({
      name_en,
      name_fa,
      slug,
      instruction_en,
      instruction_fa,
      equipment,
      muscle_group,
      metric_type,
      difficulty,
      video_link,
      image: uploadedImage.Location || null,
      image_key: uploadedImage.Key || null,
    });

    await this.exerciseRepository.save(exercise);
    return { message: ExerciseMessage.Created, data: exercise };
  }

  // 🔹 Update exercise
  async update(
    id: number,
    updateExerciseDto: UpdateExerciseDto,
    image?: Express.Multer.File,
  ) {
    const exercise = await this.exerciseRepository.findOneBy({ id });
    if (!exercise) throw new NotFoundException(ExerciseMessage.NotFound);

    let {
      name_en,
      name_fa,
      slug,
      instruction_en,
      instruction_fa,
      equipment,
      muscle_group,
      metric_type,
      difficulty,
      video_link,
    } = updateExerciseDto;

    const updateObject: DeepPartial<ExerciseEntity> = {};

    // ✅ Prevent duplicate English names
    if (name_en && name_en !== exercise.name_en) {
      const existing = await this.exerciseRepository.findOne({
        where: { name_en },
      });
      if (existing && existing.id !== id)
        throw new ConflictException(
          `Exercise with name "${name_en}" already exists`,
        );
      updateObject.name_en = name_en;
    }

    updateObject.name_fa = name_fa ?? exercise.name_fa;
    updateObject.instruction_en = instruction_en ?? exercise.instruction_en;
    updateObject.instruction_fa = instruction_fa ?? exercise.instruction_fa;
    updateObject.equipment = equipment ?? exercise.equipment;
    updateObject.muscle_group = muscle_group ?? exercise.muscle_group;
    updateObject.metric_type = metric_type ?? exercise.metric_type;
    updateObject.difficulty = difficulty ?? exercise.difficulty;
    updateObject.video_link = video_link ?? exercise.video_link;

    // ✅ Update slug if needed
    const slugBase = slug ?? name_en ?? exercise.name_en;
    let newSlug = createSlug(slugBase);
    if (await this.checkBySlug(newSlug)) newSlug += `-${randomId()}`;
    updateObject.slug = newSlug;

    // ✅ Handle new image upload
    if (image) {
      validateImageFile(image);
      const s3Folder = process.env.S3_PROJECT_FOLDER || 'exercises';
      const { Location, Key } = await this.s3Service.uploadFile(
        image,
        s3Folder,
      );

      if (exercise.image_key)
        await this.s3Service.deleteFile(exercise.image_key);

      updateObject.image = Location;
      updateObject.image_key = Key;
    }

    await this.exerciseRepository.update({ id }, updateObject);
    return { message: ExerciseMessage.Updated };
  }

  // 🔹 Delete exercise
  async remove(id: number) {
    const exercise = await this.exerciseRepository.findOne({ where: { id } });
    if (!exercise)
      throw new NotFoundException(`Exercise with ID ${id} not found`);

    try {
      if (exercise.image_key)
        await this.s3Service.deleteFile(exercise.image_key);

      await this.exerciseRepository.remove(exercise);
      return { message: `Exercise with ID ${id} deleted successfully` };
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.errno === 1451)
        throw new ConflictException(
          'Cannot delete exercise. It is being used in workout plans.',
        );
      throw new BadRequestException('Failed to delete exercise');
    }
  }

  // 🔹 Search exercises
  async searchExercises(query: string): Promise<ExerciseEntity[]> {
    return await this.exerciseRepository
      .createQueryBuilder('exercise')
      .where('exercise.name_en ILIKE :query', { query: `%${query}%` })
      .orWhere('exercise.name_fa ILIKE :query', { query: `%${query}%` })
      .orWhere('exercise.instruction_en ILIKE :query', { query: `%${query}%` })
      .orderBy('exercise.name_en', 'ASC')
      .getMany();
  }

  // ─────────────────────────────────────────────
  // 📖 Find All Exercises (with filters)
  // ─────────────────────────────────────────────
  async findAllWithFilters(
    filters: {
      equipment?: EquipmentType;
      muscle_group?: MuscleGroup;
      metric_type?: MetricType;
      difficulty?: DifficultyLevel;
    },
    pagination?: PaginationDto,
  ) {
    const query = this.exerciseRepository.createQueryBuilder('exercise');

    // Apply filters dynamically
    if (filters.equipment) {
      query.andWhere('exercise.equipment = :equipment', {
        equipment: filters.equipment,
      });
    }

    if (filters.muscle_group) {
      query.andWhere('exercise.body_part = :muscle_group', {
        muscle_group: filters.muscle_group,
      });
    }

    if (filters.metric_type) {
      query.andWhere('exercise.exercise_type = :metric_type', {
        metric_type: filters.metric_type,
      });
    }

    if (filters.difficulty) {
      query.andWhere('exercise.difficulty_level = :difficulty', {
        difficulty: filters.difficulty,
      });
    }

    // Handle pagination if provided
    if (pagination) {
      const { limit, page } = pagination;
      query.skip((page - 1) * limit).take(limit);
    }

    const [items, total] = await query.getManyAndCount();

    return {
      data: items,
      total,
      page: pagination?.page ?? 1,
      limit: pagination?.limit ?? total,
    };
  }

  // 🔹 Find by muscle group
  async findByMuscleGroup(muscleGroup: MuscleGroup) {
    const data = await this.exerciseRepository.find({
      where: { muscle_group: muscleGroup },
      order: { name_en: 'ASC' },
    });
    return { data };
  }

  // 🔹 Check by slug (used internally)
  private async checkBySlug(slug: string) {
    return this.exerciseRepository.findOneBy({ slug });
  }
}
