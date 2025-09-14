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
import { Roles } from 'src/common/enum/role.enum';
import { CanAccess } from 'src/common/decorators/role.decorator';

@Controller('admin')
@ApiTags('Admin')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard) // Apply both guards
@CanAccess(Roles.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // all users actions
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    // list of users (admin, trainer, clients)
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  // Only client actions
  @Get()
  findAllClients() {
    // Use role based:admin
    // only admin can see list of all users
    return 'List of all clients';
  }

  @Get(':id')
  findOneClientById(@Param('id') id: string) {
    // it shows all data of user
    // it can be used to create a user profile
    return ' a client data';
  }

  // Only trainer actions

  // Only admin actions
}
