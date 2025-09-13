import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { OTPEntity } from './entities/otp.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity, OTPEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
