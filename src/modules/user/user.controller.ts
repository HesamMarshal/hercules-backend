import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FormType } from '../../common/enum/form-type.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CanAccess } from '../../common/decorators/role.decorator';
import { Roles } from '../../common/enum/role.enum';
import { RoleGuard } from '../auth/guards/role.guard';
import { CreateTrainerDto } from '../trainer/dto/create-trainer.dto';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard)
@CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}
  // TODO : Change to Profile?
  @Get('/my')
  @ApiOperation({ summary: 'Get user data' })
  @ApiResponse({ status: 200, description: 'Returns user details' })
  @ApiResponse({ status: 404, description: 'user not found' })
  findMyData() {
    return this.userService.findMyProfile();
  }

  @Get('/profile')
  @ApiOperation({ summary: 'Get user data - same as /my endpoint' })
  @ApiResponse({ status: 200, description: 'Returns user details' })
  @ApiResponse({ status: 404, description: 'user not found' })
  findMyProfile() {
    // it shows all data of user
    // it can be used to create a user profile
    // User can see other users profile
    // Name
    // date of join
    // achievments
    return this.userService.findMyProfile();
  }

  @Patch('')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiConsumes(FormType.Urlencoded)
  updateData(@Body() updateUserDto: UpdateUserDto) {
    // user can edit it's data
    return this.userService.update(updateUserDto);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete current user' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiConsumes(FormType.Urlencoded)
  remove() {
    // user can delete it's account
    // hard delete or soft delete?
    return this.userService.remove();
  }

  @Get('/username/:username')
  @ApiConsumes(FormType.Urlencoded)
  @ApiOperation({
    summary: 'Find a user by username - It can use to find other users',
  })
  @ApiParam({ name: 'username', type: String })
  @ApiResponse({ status: 200, description: 'Returns user details' })
  @ApiResponse({ status: 404, description: 'user not found' })
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
  @ApiOperation({ summary: 'Current User apply to be a trainer' })
  @ApiResponse({ status: 200, description: 'Returns success request' })
  @ApiResponse({ status: 404, description: 'user not found???' })
  apllyTrainer(@Body() createTrainerDto: CreateTrainerDto) {
    // Client apply for being a trainer
    return 'User applied to be a trainer';
  }
}
