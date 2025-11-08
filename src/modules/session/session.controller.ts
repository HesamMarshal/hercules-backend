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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { SessionEntity } from './entities/session.entity';
import { PracticeSetEntity } from './entities/practice-set.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { RecordSetDto } from './dto/record-set.dto';
import { SessionResponseDto } from './dto/session-response.dto';

@ApiTags('sessions')
@Controller('sessions')
@UsePipes(new ValidationPipe({ transform: true }))
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('start/:userId')
  @ApiOperation({ summary: 'Start a new workout session' })
  @ApiResponse({
    status: 201,
    description: 'Session started successfully',
    type: SessionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User or workout not found' })
  async startSession(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<SessionEntity> {
    return this.sessionService.startSession(userId, createSessionDto);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Complete a workout session' })
  @ApiResponse({
    status: 200,
    description: 'Session completed successfully',
    type: SessionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Session not found' })
  async completeSession(
    @Param('id', ParseIntPipe) sessionId: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<SessionEntity> {
    return this.sessionService.completeSession(sessionId, updateSessionDto);
  }

  @Post(':sessionId/practices/:practiceId/sets')
  @ApiOperation({ summary: 'Record a set for a session practice' })
  @ApiResponse({
    status: 201,
    description: 'Set recorded successfully',
    type: PracticeSetEntity,
  })
  @ApiResponse({ status: 404, description: 'Session practice not found' })
  async recordSet(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Param('practiceId', ParseIntPipe) practiceId: number,
    @Body() recordSetDto: RecordSetDto,
  ): Promise<PracticeSetEntity> {
    // Note: practiceId here refers to sessionPracticeId
    return this.sessionService.recordSet(practiceId, recordSetDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get session details by ID' })
  @ApiResponse({
    status: 200,
    description: 'Session details',
    type: SessionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Session not found' })
  async getSession(
    @Param('id', ParseIntPipe) sessionId: number,
  ): Promise<SessionEntity> {
    return this.sessionService.getSessionById(sessionId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get user session history' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['active', 'completed', 'cancelled'],
  })
  @ApiResponse({
    status: 200,
    description: 'User sessions',
    type: [SessionResponseDto],
  })
  async getUserSessions(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
  ): Promise<{ sessions: SessionEntity[]; total: number }> {
    return this.sessionService.getUserSessions(userId, {
      page: page ? parseInt(page.toString()) : 1,
      limit: limit ? parseInt(limit.toString()) : 20,
      status: status as any,
    });
  }

  @Get('user/:userId/last')
  @ApiOperation({ summary: "Get user's last session" })
  @ApiResponse({
    status: 200,
    description: 'Last session',
    type: SessionResponseDto,
  })
  async getLastSession(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<SessionEntity | null> {
    return this.sessionService.getLastUserSession(userId);
  }

  @Get('user/:userId/exercises/:exerciseId/history')
  @ApiOperation({ summary: 'Get exercise history for a user' })
  @ApiResponse({
    status: 200,
    description: 'Exercise history',
    type: [PracticeSetEntity],
  })
  async getExerciseHistory(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
  ): Promise<PracticeSetEntity[]> {
    return this.sessionService.getExerciseHistory(userId, exerciseId);
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
  async deleteSession(
    @Param('id', ParseIntPipe) sessionId: number,
    @Query('userId', new ParseIntPipe({ optional: true })) userId?: number,
  ): Promise<void> {
    await this.sessionService.deleteSession(sessionId, userId);
  }

  @Delete(':id/hard')
  @ApiOperation({ summary: 'Permanently delete a session (use with caution)' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Session permanently deleted' })
  async hardDeleteSession(
    @Param('id', ParseIntPipe) sessionId: number,
    @Query('userId', new ParseIntPipe({ optional: true })) userId?: number,
  ): Promise<void> {
    await this.sessionService.hardDeleteSession(sessionId, userId);
  }
}
