// src/modules/seed/seed.controller.ts
import { Controller, Post, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  async seedData() {
    return this.seedService.seedInitialData();
  }

  @Delete()
  async clearData() {
    return this.seedService.clearData();
  }
}
