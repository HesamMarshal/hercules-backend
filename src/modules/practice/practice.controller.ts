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
} from '@nestjs/swagger';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('practices')
@ApiTags('Practices')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard)
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post()
  @CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
  @ApiOperation({ summary: 'Create a new practice' })
  @ApiResponse({ status: 201, description: 'Practice created successfully' })
  @ApiResponse({ status: 404, description: 'Workout or exercise not found' })
  async create(@Body() createPracticeDto: CreatePracticeDto) {
    return this.practiceService.create(createPracticeDto);
  }

  @Post('bulk/:workoutId')
  @CanAccess(Roles.TRAINER, Roles.ADMIN)
  @ApiOperation({ summary: 'Bulk create practices for a workout' })
  @ApiParam({ name: 'workoutId', type: Number })
  @ApiResponse({ status: 201, description: 'Practices created successfully' })
  async bulkCreate(
    @Param('workoutId', ParseIntPipe) workoutId: number,
    @Body() body: { exerciseIds: number[] },
  ) {
    return this.practiceService.bulkCreate(workoutId, body.exerciseIds);
  }

  @Get()
  @CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
  @ApiOperation({
    summary: 'Get all practices (optionally filtered by workout)',
  })
  @ApiQuery({ name: 'workoutId', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Returns practices list' })
  async findAll(@Query('workoutId') workoutId?: number) {
    return this.practiceService.findAll(workoutId);
  }

  @Get('workout/:workoutId')
  @CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
  @ApiOperation({ summary: 'Get practices by workout ID' })
  @ApiParam({ name: 'workoutId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns practices for the workout',
  })
  async findByWorkout(@Param('workoutId', ParseIntPipe) workoutId: number) {
    return this.practiceService.findByWorkout(workoutId);
  }

  @Get(':id')
  @CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
  @ApiOperation({ summary: 'Get practice by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Returns practice details' })
  @ApiResponse({ status: 404, description: 'Practice not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.practiceService.findOne(id);
  }

  @Patch(':id')
  @CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
  @ApiOperation({ summary: 'Update a practice' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Practice updated successfully' })
  @ApiResponse({ status: 404, description: 'Practice not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePracticeDto: UpdatePracticeDto,
  ) {
    return this.practiceService.update(id, updatePracticeDto);
  }

  @Patch(':id/complete')
  @CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
  @ApiOperation({ summary: 'Mark practice as completed' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Practice completed successfully' })
  @ApiResponse({ status: 404, description: 'Practice not found' })
  async complete(
    @Param('id', ParseIntPipe) id: number,
    @Body() completePracticeDto: CompletePracticeDto,
  ) {
    return this.practiceService.complete(id, completePracticeDto);
  }

  @Delete(':id')
  @CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a practice' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Practice deleted successfully' })
  @ApiResponse({ status: 404, description: 'Practice not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.practiceService.remove(id);
  }
}
