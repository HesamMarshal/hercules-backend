import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/common/enum/role.enum';
import { CanAccess } from 'src/common/decorators/role.decorator';
import { FormType } from 'src/common/enum/form-type.enum';

@Controller('workouts')
@ApiTags('Workouts')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard) // Apply both guards
@CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  @ApiConsumes(FormType.Urlencoded)
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutsService.create(createWorkoutDto);
  }

  @Get()
  findAll() {
    return this.workoutsService.findAll();
  }

  @Get(':id')
  @ApiConsumes(FormType.Urlencoded)
  findOne(@Param('id') id: string) {
    return this.workoutsService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes(FormType.Urlencoded)
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutsService.update(+id, updateWorkoutDto);
  }

  @Delete(':id')
  @ApiConsumes(FormType.Urlencoded)
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(+id);
  }
}
