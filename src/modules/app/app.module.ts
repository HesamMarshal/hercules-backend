import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/config/typeorm.config';
import { CategoryModule } from '../category/category.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { PlanModule } from '../plan/plan.module';
import { SeedModule } from '../seed/seed.module';
import { TrainerModule } from '../trainer/trainer.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig()),
    SeedModule,
    AuthModule,
    UserModule,
    CategoryModule,
    PlanModule,
    TrainerModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
