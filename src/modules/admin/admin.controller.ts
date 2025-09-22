import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../../common/enum/role.enum';
import { CanAccess } from '../../common/decorators/role.decorator';

@Controller('admin')
@ApiTags('Admin')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard) // Apply both guards
@CanAccess(Roles.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // all users actions

  @Get('/user/all')
  findAllUsaers() {
    // list of users (admin, trainer, clients)
    return this.adminService.findAllUsers();
  }

  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch('/user/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete('/user/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  // Only client actions
  @Get('/client/all')
  findAllClients() {
    // Use role based:admin
    // only admin can see list of all users
    return 'List of all clients';
  }

  // Only trainer actions
  @Get('/trainer/all')
  findAllTrainers() {
    // Use role based:admin
    // only admin can see list of all users
    return 'List of all trainers';
  }

  @Get('/trainer/application')
  findAllTrainerApplications() {
    // Use role based:admin
    // only admin can see list of all users
    return 'List of all trainers';
  }
  @Get('/trainer/application/:id')
  findTrainerApplicationById() {
    // Use role based:admin
    // only admin can see list of all users
    return 'List of all trainers';
  }

  // Only admin actions
  @Get('/admin/all')
  findAlltAdmins() {
    // Use role based:admin
    // only admin can see list of all users
    return 'List of all admins';
  }
}
