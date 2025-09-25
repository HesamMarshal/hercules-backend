// src/modules/seed/seed.controller.ts
import { Controller, Post, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('seed')
@ApiTags('Seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('')
  @ApiOperation({
    summary: 'Seed initial data (users, exercises, plans, workouts)',
  })
  @ApiResponse({ status: 201, description: 'Data seeded successfully' })
  async seedAll() {
    return this.seedService.seedInitialData();
  }

  @Post('users')
  @ApiOperation({
    summary: 'Seed initial data (users, exercises, plans, workouts)',
  })
  @ApiResponse({ status: 201, description: 'Data seeded successfully' })
  async seedUsers() {
    return this.seedService.seedUsers();
  }

  @Post('exercises')
  @ApiOperation({ summary: 'Seed exercises only' })
  @ApiResponse({ status: 201, description: 'Exercises seeded successfully' })
  async seedExercises() {
    return this.seedService.seedExercisesOnly();
  }

  @Post('workouts')
  @ApiOperation({ summary: 'Seed sample workouts for existing users' })
  @ApiResponse({ status: 201, description: 'Workouts seeded successfully' })
  async seedWorkouts() {
    return this.seedService.seedSampleWorkouts();
  }

  @Delete()
  @ApiOperation({ summary: 'Clear all data' })
  @ApiResponse({ status: 200, description: 'Data cleared successfully' })
  async clearData() {
    return this.seedService.clearData();
  }
}
