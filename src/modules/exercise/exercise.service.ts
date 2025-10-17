import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { createSlug, randomId } from '../../common/utility/function.utils';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseEntity } from './entities/exercise.entity';
import { DeepPartial, ILike, Repository } from 'typeorm';
import { ExerciseMessage } from './message/message.enum';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { paginationSolver } from '../../common/utility/pagination.util';
import { S3Service } from '../S3/s3.service';
import { validateImageFile } from 'src/common/utility/image.utils';
import { Lang } from 'src/common/enum/language.enum';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private exerciseRepository: Repository<ExerciseEntity>,

    private s3Service: S3Service,
  ) {}

  async findAll(paginationDto: PaginationDto, lang: Lang) {
    const { limit, page, skip } = paginationSolver(paginationDto);

    const [exercises, total] = await this.exerciseRepository.findAndCount({
      order: {
        name_en: 'ASC',
      },
      skip, //: (page - 1) * limit,
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

  async findOne(id: number) {
    const exercise = await this.exerciseRepository.findOneBy({ id });
    if (!exercise) throw new NotFoundException(ExerciseMessage.NotFound);
    return { data: exercise, message: ExerciseMessage.Found };
  }
  async findOneBySlug(slug: string) {
    const exercise = await this.exerciseRepository.findOneBy({ slug });
    if (!exercise) throw new NotFoundException(ExerciseMessage.NotFound);
    return { data: exercise, message: ExerciseMessage.Found };
  }

  async findByName(name: string) {
    const exercise = await this.exerciseRepository.findOne({
      where: [{ name_en: ILike(`%${name}%`) }, { name_fa: ILike(`%${name}%`) }],
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with name "${name}" not found`);
    }

    return { data: exercise, message: ExerciseMessage.Found };
  }

  async create(
    createExerciseDto: CreateExerciseDto,
    image?: Express.Multer.File,
  ) {
    const s3Folder = process.env.S3_PROJECT_FOLDER || 'test-folder';
    const { Location, Key } = await this.s3Service.uploadFile(image, s3Folder);

    let {
      name_en,
      name_fa,
      slug,
      category,
      body_part,
      exercise_type,
      video_link,
      instruction_en,
      instruction_fa,
    } = createExerciseDto;

    let slugDate = slug ?? name_en;
    slug = createSlug(slugDate);

    const isExist = await this.checkBySlug(slug);
    if (isExist) {
      slug += `-${randomId()}`;
    }

    let exercise = this.exerciseRepository.create({
      name_en,
      name_fa,
      slug,
      category,
      body_part,
      exercise_type,
      video_link,
      instruction_en,
      instruction_fa,
      image: Location,
      image_key: Key,
    });
    this.exerciseRepository.save(exercise);
    return { message: ExerciseMessage.Created };
  }

  async update(
    id: number,
    updateExerciseDto: UpdateExerciseDto,
    image?: Express.Multer.File,
  ) {
    // Find the existing exercise
    const exercise = await this.exerciseRepository.findOneBy({ id });
    if (!exercise) throw new NotFoundException(ExerciseMessage.NotFound);

    let {
      name_en,
      name_fa,
      slug,
      category,
      body_part,
      exercise_type,
      video_link,
      instruction_en,
      instruction_fa,
    } = updateExerciseDto;

    const updateObject: DeepPartial<ExerciseEntity> = {};

    // If name is being updated, check for conflicts
    if (
      updateExerciseDto.name_en &&
      updateExerciseDto.name_en !== exercise.name_en
    ) {
      const existingExercise = await this.exerciseRepository.findOne({
        where: { name_en: updateExerciseDto.name_en },
      });
      if (existingExercise && existingExercise.id !== id) {
        throw new ConflictException(
          `Exercise with name "${updateExerciseDto.name_en}" already exists`,
        );
      }
    }
    updateObject.name_en = name_en;

    let slugDate = slug ?? name_en;
    slug = createSlug(slugDate);
    const slugIsExist = await this.checkBySlug(slug);
    if (slugIsExist) slug += `-${randomId()}`;
    updateObject.slug = slug;

    if (category) updateObject.category = category;
    else updateObject.category = exercise.category;

    if (body_part) updateObject.body_part = body_part;
    else updateObject.body_part = exercise.body_part;

    if (exercise_type) updateObject.exercise_type = exercise_type;
    else updateObject.exercise_type = exercise.exercise_type;

    if (video_link) updateObject.video_link = video_link;
    else updateObject.video_link = exercise.video_link;

    if (instruction_en) updateObject.instruction_en = instruction_en;
    else updateObject.instruction_en = exercise.instruction_en;

    if (instruction_fa) updateObject.instruction_fa = instruction_fa;
    else updateObject.instruction_fa = exercise.instruction_fa;

    if (image) {
      // validateImageFile(image);
      const s3Folder = process.env.S3_PROJECT_FOLDER || 'test-folder';
      const { Location, Key } = await this.s3Service.uploadFile(
        image,
        s3Folder,
      );
      if (Location) {
        updateObject['image'] = Location;
        updateObject['image_key'] = Key;
        if (exercise?.image_key)
          await this.s3Service.deleteFile(exercise.image_key);
      }
    }

    try {
      await this.exerciseRepository.update({ id }, updateObject);
      return {
        message: ExerciseMessage.Updated,
      };
    } catch (error) {
      // MySQL duplicate entry error code
      if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
        throw new ConflictException('Exercise name must be unique');
      }
      throw new BadRequestException('Failed to update exercise');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const exercise = await this.exerciseRepository.findOne({
      where: { id },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    try {
      await this.exerciseRepository.remove(exercise);
      return {
        message: `Exercise with ID ${id} has been deleted successfully`,
      };
    } catch (error) {
      // Check if the exercise is being referenced elsewhere
      if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.errno === 1451) {
        throw new ConflictException(
          'Cannot delete exercise. It is being used in workout plans.',
        );
      }
      throw new BadRequestException('Failed to delete exercise');
    }
  }

  // Additional useful methods
  async searchExercises(query: string): Promise<ExerciseEntity[]> {
    // TODO : Pagination???
    return await this.exerciseRepository
      .createQueryBuilder('exercise')
      .where('exercise.name ILIKE :query', { query: `%${query}%` })
      .orWhere('exercise.description ILIKE :query', { query: `%${query}%` })
      .orWhere('exercise.category ILIKE :query', { query: `%${query}%` })
      .orderBy('exercise.name', 'ASC')
      .getMany();
  }

  async findByCategory(category: string): Promise<ExerciseEntity[]> {
    // TODO : Pagination???
    return await this.exerciseRepository.find({
      where: { category },
      order: { name_en: 'ASC' },
    });
  }

  async findByBodyPart(bodyPart: string) {
    // TODO : Pagination???
    return {
      data: await this.exerciseRepository.find({
        where: { body_part: bodyPart },
        order: { name_en: 'ASC' },
      }),
    };
  }

  // Helper Functions
  async checkBySlug(slug: string) {
    const exercise = await this.exerciseRepository.findOneBy({ slug });
    return exercise;
  }
}
