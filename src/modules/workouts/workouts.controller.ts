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
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../../common/enum/role.enum';
import { CanAccess } from '../../common/decorators/role.decorator';
import { FormType } from '../../common/enum/form-type.enum';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Controller('workouts')
@ApiTags('Workouts')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard) // Apply both guards
@CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workout' })
  @ApiResponse({ status: 201, description: 'Workout created successfully' })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiConsumes(FormType.Urlencoded)
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutsService.create(createWorkoutDto);
  }

  @Get('byPlan/:planId')
  @ApiOperation({ summary: 'Get all workouts (role-based access)' })
  @ApiParam({ name: 'planId', type: Number, description: 'Plan ID' })
  @ApiResponse({ status: 200, description: 'Returns workouts based on Plan' })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  @ApiConsumes(FormType.Urlencoded)
  findAllByPlanId(
    @Param('planId') planId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.workoutsService.findAllByPlanId(planId, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get workout by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Workout ID' })
  @ApiResponse({ status: 200, description: 'Returns workout details' })
  @ApiResponse({ status: 404, description: 'Workout not found' })
  @ApiConsumes(FormType.Urlencoded)
  findOne(@Param('id') id: number) {
    return this.workoutsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workout' })
  @ApiParam({ name: 'id', type: Number, description: 'Workout ID' })
  @ApiResponse({ status: 200, description: 'Workout updated successfully' })
  @ApiResponse({ status: 404, description: 'Workout or plan not found' })
  @ApiConsumes(FormType.Urlencoded)
  update(@Param('id') id: number, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutsService.update(+id, updateWorkoutDto);
  }

  @Delete(':id')
  @ApiConsumes(FormType.Urlencoded)
  @ApiOperation({ summary: 'Delete a workout' })
  @ApiParam({ name: 'id', type: Number, description: 'Workout ID' })
  @ApiResponse({ status: 204, description: 'Workout deleted successfully' })
  @ApiResponse({ status: 404, description: 'Workout not found' })
  remove(@Param('id') id: number) {
    return this.workoutsService.remove(+id);
  }
}
