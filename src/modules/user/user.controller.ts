import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormType } from 'src/common/enum/form-type.enum';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    // Use role based:admin
    // only admin can see list of all users
    return this.userService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    // it shows all data of user
    // it can be used to create a user profile
    return this.userService.findOneById(+id);
  }
  @Get('/username/:username')
  findOneByUserName(@Param('username') username: string) {
    // it shows all data of user
    // it can be used to create a user profile
    return this.userService.findOneByUsername(username);
  }

  @Patch(':id')
  @ApiConsumes(FormType.Multipart)
  updateUsername(@Body() updateUserDto: UpdateUserDto) {
    // user can edit it's data
    return this.userService.update(updateUserDto);
  }

  @Patch(':id')
  @ApiConsumes(FormType.Multipart)
  updateData(@Body() updateUserDto: UpdateUserDto) {
    // user can edit it's data
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // user can delete it's account
    // hard delete or soft delete?
    return this.userService.remove(+id);
  }
}
