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
import { CanAccess } from 'src/common/decorators/role.decorator';
import { Roles } from 'src/common/enum/role.enum';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard) // Apply both guards
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Public Access
  @Get('/username/:username')
  findOneByUserName(@Param('username') username: string) {
    // it shows all data of user
    // it can be used to create a user profile
    return this.userService.findOneByUsername(username);
  }

  // User Access
  @Get('/my')
  @CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
  findMyProfile() {
    // it shows all data of a user
    // it can be used to create a user profile
    return this.userService.findMyProfile();
  }

  @Patch('/username/:id')
  @CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
  @ApiConsumes(FormType.Multipart)
  updateUsername(@Body() updateUserDto: UpdateUserDto) {
    // user can edit it's data
    return this.userService.update(updateUserDto);
  }

  @Patch(':id')
  @CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
  @ApiConsumes(FormType.Multipart)
  updateData(@Body() updateUserDto: UpdateUserDto) {
    // user can edit it's data
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  @CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
  remove(@Param('id') id: string) {
    // user can delete it's account
    // hard delete or soft delete?
    return this.userService.remove(+id);
  }

  // Trainer Access
  @Get()

  // Admin Access
  @Get()
  @CanAccess(Roles.ADMIN) // Only admins can access
  findAll() {
    // Use role based:admin
    // only admin can see list of all users
    return this.userService.findAll();
  }

  @Get(':id')
  @CanAccess(Roles.ADMIN) // Only admins can access
  findOneById(@Param('id') id: string) {
    // it shows all data of user
    // it can be used to create a user profile
    return this.userService.findOneById(+id);
  }
}
