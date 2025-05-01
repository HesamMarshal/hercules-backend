import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
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
    const { Location } = await this.s3Service.uploadFile(
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

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
