// src/modules/practice/practice.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PracticeService } from './practice.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { CompletePracticeDto } from './dto/complete-practice.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

import { CanAccess } from '../../common/decorators/role.decorator';
import { Roles } from '../../common/enum/role.enum';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { RoleGuard } from '../auth/guards/role.guard';
import { FormType } from '../../common/enum/form-type.enum';

// TODO: Check endpoints if We need all of them?

@Controller('practices')
@ApiTags('Practices')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard)
@CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new practice' })
  @ApiResponse({ status: 201, description: 'Practice created successfully' })
  @ApiResponse({ status: 404, description: 'Practice or exercise not found' })
  @ApiConsumes(FormType.Urlencoded)
  async create(@Body() createPracticeDto: CreatePracticeDto) {
    return this.practiceService.create(createPracticeDto);
  }

  // @Post('bulk/:workoutId')
  // @CanAccess(Roles.TRAINER, Roles.ADMIN)
  // @ApiOperation({ summary: 'Bulk create practices for a workout' })
  // @ApiParam({ name: 'workoutId', type: Number })
  // @ApiResponse({ status: 201, description: 'Practices created successfully' })
  // async bulkCreate(
  //   @Param('workoutId', ParseIntPipe) workoutId: number,
  //   @Body() body: { exerciseIds: number[] },
  // ) {
  //   return this.practiceService.bulkCreate(workoutId, body.exerciseIds);
  // }

  @Get()
  @ApiOperation({
    summary: 'Get all practices (optionally filtered by workout)',
  })
  @ApiQuery({ name: 'workoutId', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Returns practices list' })
  async findAll(@Query('workoutId') workoutId?: number) {
    return this.practiceService.findAll(workoutId);
  }

  @Get('workout/:workoutId')
  @ApiOperation({ summary: 'Get practices by workout ID' })
  @ApiParam({ name: 'workoutId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns practices for the workout',
  })
  @ApiConsumes(FormType.Urlencoded)
  async findByWorkout(@Param('workoutId', ParseIntPipe) workoutId: number) {
    return this.practiceService.findByWorkout(workoutId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get practice by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Returns practice details' })
  @ApiResponse({ status: 404, description: 'Practice not found' })
  @ApiConsumes(FormType.Urlencoded)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.practiceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a practice' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Practice updated successfully' })
  @ApiResponse({ status: 404, description: 'Practice not found' })
  @ApiConsumes(FormType.Urlencoded)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePracticeDto: UpdatePracticeDto,
  ) {
    return this.practiceService.update(id, updatePracticeDto);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Mark practice as completed' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Practice completed successfully' })
  @ApiResponse({ status: 404, description: 'Practice not found' })
  @ApiConsumes(FormType.Urlencoded)
  async complete(
    @Param('id', ParseIntPipe) id: number,
    @Body() completePracticeDto: CompletePracticeDto,
  ) {
    return this.practiceService.complete(id, completePracticeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a practice' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Practice deleted successfully' })
  @ApiResponse({ status: 404, description: 'Practice not found' })
  @ApiConsumes(FormType.Urlencoded)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.practiceService.remove(id);
  }
}
