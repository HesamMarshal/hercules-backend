import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { createSlug, randomId } from '../../common/utility/function.utils';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseEntity } from './entities/exercise.entity';
import { Repository } from 'typeorm';
import { ExerciseMessage } from './message/message.enum';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { paginationSolver } from '../../common/utility/pagination.util';
import { S3Service } from '../S3/s3.service';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private exerciseRepository: Repository<ExerciseEntity>,

    private s3Service: S3Service,
  ) {}

  async create(
    createExerciseDto: CreateExerciseDto,
    image: Express.Multer.File,
  ) {
    const s3Folder = process.env.S3_PROJECT_FOLDER || 'test-folder';
    const { Location, Key } = await this.s3Service.uploadFile(image, s3Folder);

    let {
      name,
      slug,
      category,
      body_part,
      exercise_type,
      video_link,
      instruction,
    } = createExerciseDto;

    let slugDate = slug ?? name;
    slug = createSlug(slugDate);

    const isExist = await this.checkBySlug(slug);
    if (isExist) {
      slug += `-${randomId()}`;
    }

    let exercise = this.exerciseRepository.create({
      name,
      slug,
      category,
      body_part,
      exercise_type,
      video_link,
      instruction,
      image: Location,
      image_key: Key,
    });
    this.exerciseRepository.save(exercise);
    return ExerciseMessage.Created;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page, skip } = paginationSolver(paginationDto);

    const [exercises, total] = await this.exerciseRepository.findAndCount({
      order: {
        name: 'DESC',
        id: 'DESC',
      },
      skip, //: (page - 1) * limit,
      take: limit,
    });
    return {
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
    return exercise;
  }
  async findOneBySlug(slug: string) {
    const exercise = await this.exerciseRepository.findOneBy({ slug });
    if (!exercise) throw new NotFoundException(ExerciseMessage.NotFound);
    return exercise;
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  async remove(id: number) {
    return `This action removes a #${id} exercise`;
  }

  // Helper Functions

  async checkBySlug(slug: string) {
    const exercise = await this.exerciseRepository.findOneBy({ slug });
    return exercise;
  }
}
