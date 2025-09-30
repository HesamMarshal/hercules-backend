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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../../common/enum/role.enum';
import { CanAccess } from '../../common/decorators/role.decorator';
import { FormType } from '../../common/enum/form-type.enum';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Controller('plan')
@ApiTags('Plan')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard)
@CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new plan' })
  @ApiResponse({ status: 201, description: 'Plan created successfully' })
  @ApiResponse({ status: 404, description: 'Plan or exercise not found' })
  @ApiConsumes(FormType.Urlencoded)
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Plans' })
  @ApiResponse({ status: 200, description: 'Returns plan list' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.planService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get plan by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Returns plan details' })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  @ApiConsumes(FormType.Urlencoded)
  findOne(@Param('id') id: string) {
    return this.planService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a plan' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Plan updated successfully' })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  @ApiConsumes(FormType.Urlencoded)
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(+id, updatePlanDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a plan' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Plan deleted successfully' })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  @ApiConsumes(FormType.Urlencoded)
  remove(@Param('id') id: string) {
    return this.planService.remove(+id);
  }
}
