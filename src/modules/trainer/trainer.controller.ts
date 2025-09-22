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
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { CanAccess } from '../../common/decorators/role.decorator';
import { Roles } from '../../common/enum/role.enum';

@Controller('trainer')
@ApiTags('Trainer')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard) // Apply both guards
@CanAccess(Roles.TRAINER, Roles.ADMIN)
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  addCertificate(@Body() createTrainerDto: CreateTrainerDto) {
    // change the role of user to trainer
    return this.trainerService.addCertificate(createTrainerDto);
  }

  @Get()
  findCertificates() {
    // It shows list of all student of current trainer
    return this.trainerService.findAll();
  }

  @Patch()
  updateToTrainer(@Body() createTrainerDto: CreateTrainerDto) {
    // Access: Admin
    // change the role of user to trainer
    return this.trainerService.create(createTrainerDto);
  }

  @Get()
  findAllTrainers() {
    // Shows all trainers
    // It shows list of all trainers order by some properties
    return this.trainerService.findAll();
  }

  @Get()
  findAllStudent() {
    // It shows list of all student of current trainer
    return this.trainerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // find information about the trainer
    return this.trainerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
    // edit trainer informations
    return this.trainerService.update(+id, updateTrainerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // delete the user informations
    // or change the role to Client
    return this.trainerService.remove(+id);
  }

  @Get()
  @CanAccess(Roles.ADMIN, Roles.TRAINER) // Only admins and trainers has access can access
  findMyClients() {
    // this function returns all the clients of a specific trainer
    // Maybe we should send this to trainer module
    return 'Should return a list of client of current trainer';
  }
}
