import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../../common/enum/role.enum';
import { CanAccess } from '../../common/decorators/role.decorator';
import { FormType } from '../../common/enum/form-type.enum';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Controller('plan')
@ApiTags('Plan')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard) // Apply both guards
@CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @ApiConsumes(FormType.Urlencoded)
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.planService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes(FormType.Urlencoded)
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(+id, updatePlanDto);
  }

  @Delete(':id')
  @ApiConsumes(FormType.Urlencoded)
  remove(@Param('id') id: string) {
    return this.planService.remove(+id);
  }
}
