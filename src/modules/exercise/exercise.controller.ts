import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Optional,
} from '@nestjs/common';

import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CanAccess } from '../../common/decorators/role.decorator';
import { Roles } from '../../common/enum/role.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { FormType } from '../../common/enum/form-type.enum';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Pagination } from '../../common/decorators/pagination.decorator';
import { UploadFileS3 } from 'src/common/interceptors/upload-file.interceptor';
import { Lang } from 'src/common/enum/language.enum';
import { EquipmentType } from './enums/equipment.enum';
import { MuscleGroup } from './enums/muscleGroup.enum';
import { MetricType } from './enums/metric.enum';
import { DifficultyLevel } from './enums/difficulty.enum';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
@ApiTags('Exercise')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard)
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  @ApiOperation({ summary: 'Get all exercises (with pagination & language)' })
  @ApiResponse({ status: 200, description: 'Returns all exercises' })
  @ApiQuery({ name: 'lang', enum: Lang, required: false })
  @Pagination()
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('lang') lang: Lang = Lang.EN,
  ) {
    return this.exerciseService.findAll(paginationDto, lang);
  }
  @Get('search')
  @ApiOperation({ summary: 'Search exercises by query' })
  @ApiResponse({ status: 200, description: 'Returns matching exercises' })
  search(@Query('q') query: string) {
    return this.exerciseService.searchExercises(query);
  }

  @Get('filter')
  @ApiOperation({
    summary: 'Filter exercises by equipment, muscle, metric, or difficulty',
  })
  @ApiQuery({ name: 'equipment', enum: EquipmentType, required: false })
  @ApiQuery({ name: 'muscle_group', enum: MuscleGroup, required: false })
  @ApiQuery({ name: 'metric_type', enum: MetricType, required: false })
  @ApiQuery({ name: 'difficulty', enum: DifficultyLevel, required: false })
  findByFilters(
    @Query('equipment') equipment?: EquipmentType,
    @Query('muscle_group') muscle_group?: MuscleGroup,
    @Query('metric_type') metric_type?: MetricType,
    @Query('difficulty') difficulty?: DifficultyLevel,
    // @Query() paginationDto?: PaginationDto,
  ) {
    console.log(equipment);
    return this.exerciseService.findAllWithFilters(
      { equipment, muscle_group, metric_type, difficulty },
      // paginationDto,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an exercise by ID' })
  @ApiResponse({ status: 200, description: 'Returns exercise details' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  @ApiConsumes(FormType.Urlencoded)
  findOne(@Param('id') id: number) {
    return this.exerciseService.findOne(+id);
  }

  @Get('/slug/:slug')
  @ApiOperation({ summary: 'Get an exercise by slug' })
  @ApiConsumes(FormType.Urlencoded)
  findOneBySlug(@Param('slug') slug: string) {
    return this.exerciseService.findOneBySlug(slug);
  }

  @Get('/name/:name')
  @ApiOperation({ summary: 'Get an exercise by name' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  @ApiConsumes(FormType.Urlencoded)
  findOneByName(@Param('name') name: string) {
    return this.exerciseService.findOneBySlug(name);
  }

  @Get('names/:name')
  @ApiOperation({ summary: 'Get exercise by name' })
  @ApiResponse({ status: 200, description: 'Returns exercise details' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  findByName(@Param('name') name: string) {
    return this.exerciseService.findByName(name);
  }

  // ─────────────────────────────────────────────
  // 🔐 Admin Routes
  // ─────────────────────────────────────────────

  @Post()
  @CanAccess(Roles.ADMIN)
  @ApiOperation({ summary: 'ADMIN — Create new exercise' })
  @ApiResponse({ status: 201, description: 'Exercise created successfully' })
  @ApiResponse({ status: 409, description: 'Exercise name already exists' })
  @UseInterceptors(UploadFileS3('image'))
  @ApiConsumes(FormType.Multipart)
  create(
    @Body() createExerciseDto: CreateExerciseDto,
    @Optional()
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false, // Set file as not required
        validators: [
          new MaxFileSizeValidator({ maxSize: 2097152 }), //2 *1024*1024
          new FileTypeValidator({ fileType: 'image/(png|jpg|jpeg|webp)' }),
        ],
      }),
    )
    image?: Express.Multer.File,
  ) {
    return this.exerciseService.create(createExerciseDto, image);
  }

  @Patch(':id')
  @CanAccess(Roles.ADMIN)
  @ApiOperation({ summary: 'ADMIN only - Update an exercise' })
  @ApiResponse({ status: 200, description: 'Exercise updated successfully' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  @ApiResponse({ status: 409, description: 'Exercise name already exists' })
  @UseInterceptors(UploadFileS3('image'))
  @ApiConsumes(FormType.Multipart)
  update(
    @Param('id') id: number,
    @Body() updateExerciseDto: UpdateExerciseDto,
    @Optional() // This makes the file parameter optional
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false, // Set file as not required
        validators: [
          new MaxFileSizeValidator({ maxSize: 2097152 }), //2 *1024*1024
          new FileTypeValidator({ fileType: 'image/(png|jpg|jpeg|webp)' }),
        ],
      }),
    )
    image?: Express.Multer.File,
  ) {
    return this.exerciseService.update(+id, updateExerciseDto, image);
  }

  @Delete(':id')
  @CanAccess(Roles.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'ADMIN only - Delete an exercise' })
  @ApiResponse({ status: 204, description: 'Exercise deleted successfully' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  @ApiResponse({
    status: 409,
    description: 'Exercise is being used in workouts',
  })
  @ApiConsumes(FormType.Urlencoded)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exerciseService.remove(+id);
  }
}
