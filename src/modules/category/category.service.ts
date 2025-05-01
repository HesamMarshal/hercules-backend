import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeepPartial, Repository } from 'typeorm';
import { S3Service } from '../S3/s3.service';
import { CategoryMessage } from 'src/common/messages/message.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  paginationGenerator,
  paginationSolver,
} from 'src/common/utility/pagination.util';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private s3Service: S3Service,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    image: Express.Multer.File,
  ) {
    const { Location, Key } = await this.s3Service.uploadFile(
      image,
      process.env.S3_PROJECT_FOLDER,
    );

    let { name, slug } = createCategoryDto;

    const category = await this.findOneBySlug(slug);
    if (category) throw new ConflictException(CategoryMessage.AlreadyExist);

    await this.categoryRepository.insert({
      name,
      slug,
      image: Location,
      imageKey: Key,
    });

    return {
      message: CategoryMessage.Created,
    };
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, skip, page } = paginationSolver(
      paginationDto.page,
      paginationDto.limit,
    );
    const [categories, count] = await this.categoryRepository.findAndCount({
      where: {},

      skip,
      take: limit,
      order: { id: 'DESC' },
    });
    return {
      pagination: paginationGenerator(count, page, limit),
      categories,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async findOneBySlug(slug: string) {
    return await this.categoryRepository.findOneBy({ slug });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    image: Express.Multer.File,
  ) {
    const { name, slug } = updateCategoryDto;

    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException(CategoryMessage.NotFound);

    const updateObject: DeepPartial<CategoryEntity> = {};

    if (image) {
      const { Location, Key } = await this.s3Service.uploadFile(
        image,
        process.env.S3_PROJECT_FOLDER,
      );
      if (Location) {
        updateObject['image'] = Location;
        updateObject['imageKey'] = Key;
        await this.s3Service.deleteFile(category?.imageKey);
      }
    }

    if (name) updateObject['name'] = name;
    if (slug) {
      const category = await this.categoryRepository.findOneBy({ slug });
      if (!category && category.id !== id)
        throw new ConflictException(CategoryMessage.AlreadyExist);
      updateObject['slug'] = slug;
    }

    await this.categoryRepository.update({ id }, updateObject);
    return {
      message: CategoryMessage.Updated,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
