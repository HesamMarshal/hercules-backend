import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormType } from 'src/common/enum/form-type.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CanAccess } from 'src/common/decorators/role.decorator';
import { Roles } from 'src/common/enum/role.enum';
import { RoleGuard } from '../auth/guards/role.guard';
import { CreateTrainerDto } from '../trainer/dto/create-trainer.dto';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard) // Apply both guards
@CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/my')
  findMyProfile() {
    // it shows all data of a user
    // it can be used to create a user profile
    return this.userService.findMyProfile();
  }

  @Patch('')
  @ApiConsumes(FormType.Urlencoded)
  updateData(@Body() updateUserDto: UpdateUserDto) {
    // user can edit it's data
    return this.userService.update(updateUserDto);
  }

  @Delete()
  @ApiConsumes(FormType.Urlencoded)
  remove() {
    // user can delete it's account
    // hard delete or soft delete?
    return this.userService.remove();
  }

  @Get('/username/:username')
  @ApiConsumes(FormType.Urlencoded)
  findOneByUserName(@Param('username') username: string) {
    // it shows all data of user
    // it can be used to create a user profile
    // User can see other users profile
    // Name
    // date of join
    // achievments
    return this.userService.findOneByUsername(username);
  }

  @Post('/applyTrainer')
  @ApiConsumes(FormType.Urlencoded)
  apllyTrainer(@Body() createTrainerDto: CreateTrainerDto) {
    // Client apply for being a trainer
    return 'User applied to be a trainer';
  }
}
