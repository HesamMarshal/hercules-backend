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
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CanAccess } from '../../common/decorators/role.decorator';
import { Roles } from '../../common/enum/role.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { FormType } from '../../common/enum/form-type.enum';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Pagination } from '../../common/decorators/pagination.decorator';

@Controller('exercise')
@ApiTags('Exercise')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard) // Apply both guards
@CanAccess(Roles.ADMIN)
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  @ApiConsumes(FormType.Urlencoded)
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exerciseService.create(createExerciseDto);
  }

  @Get()
  @Pagination()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.exerciseService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiConsumes(FormType.Urlencoded)
  findOne(@Param('id') id: string) {
    return this.exerciseService.findOne(+id);
  }
  @Get('/by-slug/:slug')
  @ApiConsumes(FormType.Urlencoded)
  findOneBySlug(@Param('slug') slug: string) {
    return this.exerciseService.findOneBySlug(slug);
  }

  @Patch(':id')
  @ApiConsumes(FormType.Urlencoded)
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exerciseService.update(+id, updateExerciseDto);
  }

  @Delete(':id')
  @ApiConsumes(FormType.Urlencoded)
  remove(@Param('id') id: string) {
    return this.exerciseService.remove(+id);
  }
}
