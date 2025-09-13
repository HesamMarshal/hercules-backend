import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Controller('trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post('/trainer/apply')
  apllyTrainer(@Body() createTrainerDto: CreateTrainerDto) {
    // Client apply for being a trainer
    return this.trainerService.create(createTrainerDto);
  }

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
}
