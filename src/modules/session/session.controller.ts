// src/modules/session/session.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { SessionService } from './session.service';
import { SessionEntity } from './entities/session.entity';
import { PracticeSetEntity } from './entities/practice-set.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { RecordSetDto } from './dto/record-set.dto';
import { SessionResponseDto } from './dto/session-response.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/common/enum/role.enum';
import { CanAccess } from 'src/common/decorators/role.decorator';
import { PauseSessionDto } from './dto/pause-session.dto';
import { FormType } from 'src/common/enum/form-type.enum';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { SessionQueryDto } from './dto/session-query.dto';

@ApiTags('sessions')
@Controller('sessions')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard, RoleGuard)
@CanAccess(Roles.CLIENT, Roles.TRAINER, Roles.ADMIN)
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('start/')
  @ApiOperation({ summary: 'Start a new workout session' })
  @ApiResponse({
    status: 201,
    description: 'Session started successfully',
    type: SessionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User or workout not found' })
  @ApiConsumes(FormType.Urlencoded)
  async startSession(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<SessionEntity> {
    return this.sessionService.startSession(createSessionDto);
  }

  // Pause session
  @Patch(':id/pause')
  @ApiOperation({ summary: 'Pause an active session' })
  @ApiResponse({
    status: 200,
    description: 'Session paused successfully',
    type: SessionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid session state' })
  @ApiConsumes(FormType.Urlencoded)
  async pauseSession(
    @Param('id', ParseIntPipe) sessionId: number,
    @Body() dto?: PauseSessionDto,
  ): Promise<SessionEntity> {
    return this.sessionService.pauseSession(sessionId, dto);
  }

  // Resume session
  @Patch(':id/resume')
  @ApiOperation({ summary: 'Resume a paused session' })
  @ApiResponse({
    status: 200,
    description: 'Session resumed successfully',
    type: SessionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid session state' })
  @ApiConsumes(FormType.Urlencoded)
  async resumeSession(
    @Param('id', ParseIntPipe) sessionId: number,
  ): Promise<SessionEntity> {
    return this.sessionService.resumeSession(sessionId);
  }

  // Complete sessions
  @Patch(':id/complete')
  @ApiOperation({ summary: 'Complete a workout session' })
  @ApiResponse({
    status: 200,
    description: 'Session completed successfully',
    type: SessionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Session not found' })
  @ApiConsumes(FormType.Urlencoded)
  async completeSession(
    @Param('id', ParseIntPipe) sessionId: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<SessionEntity> {
    return this.sessionService.completeSession(sessionId, updateSessionDto);
  }

  // @Post(':sessionId/practices/:practiceId/sets')
  // @ApiOperation({ summary: 'Record a set for a session practice' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Set recorded successfully',
  //   type: PracticeSetEntity,
  // })
  // @ApiResponse({ status: 404, description: 'Session practice not found' })
  // @ApiConsumes(FormType.Urlencoded)
  // async recordSet(
  //   @Param('sessionId', ParseIntPipe) sessionId: number,
  //   @Param('practiceId', ParseIntPipe) practiceId: number,
  //   @Body() recordSetDto: RecordSetDto,
  // ) {
  //   return this.sessionService.recordSet(sessionId, practiceId, recordSetDto);
  // }

  @Get('my-sessions')
  @Pagination(1, 10)
  @ApiOperation({ summary: 'Get user session history' })
  @ApiResponse({ status: 200, type: [SessionResponseDto] })
  async getUserSessions(@Query() query: SessionQueryDto) {
    return this.sessionService.getUserSessions(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get session details by ID' })
  @ApiResponse({
    status: 200,
    description: 'Session details',
    type: SessionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Session not found' })
  @ApiConsumes(FormType.Urlencoded)
  async getSession(
    @Param('id', ParseIntPipe) sessionId: number,
  ): Promise<SessionEntity> {
    return this.sessionService.getSessionById(sessionId);
  }

  @Get('my-last-session')
  @ApiOperation({ summary: "Get user's last session" })
  @ApiResponse({
    status: 200,
    description: 'Last session',
    type: SessionResponseDto,
  })
  async getLastSession(): Promise<SessionEntity | null> {
    return this.sessionService.getLastUserSession();
  }

  @Get('my-exercises/:exerciseId/history')
  @ApiOperation({ summary: 'Get exercise history for a user' })
  @ApiResponse({
    status: 200,
    description: 'Exercise history',
    type: [PracticeSetEntity],
  })
  async getExerciseHistory(
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
  ): Promise<PracticeSetEntity[]> {
    return this.sessionService.getExerciseHistory(exerciseId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancel/delete a session' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Session cancelled successfully' })
  @ApiResponse({ status: 404, description: 'Session not found' })
  @ApiResponse({
    status: 403,
    description: 'Not authorized to delete this session',
  })
  @ApiConsumes(FormType.Urlencoded)
  async deleteSession(
    @Param('id', ParseIntPipe) sessionId: number,
  ): Promise<void> {
    await this.sessionService.deleteSession(sessionId);
  }

  @Delete(':id/hard')
  @ApiOperation({ summary: 'Permanently delete a session (use with caution)' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Session permanently deleted' })
  @ApiConsumes(FormType.Urlencoded)
  async hardDeleteSession(
    @Param('id', ParseIntPipe) sessionId: number,
  ): Promise<void> {
    await this.sessionService.hardDeleteSession(sessionId);
  }
}
