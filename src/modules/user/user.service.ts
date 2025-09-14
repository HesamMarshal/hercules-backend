import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AuthMessage,
  NotFoundMessage,
  UserMessage,
} from 'src/common/messages/message.enum';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  // Helper functions

  async findCurrentUser() {
    const { user } = this?.request;
    if (!user) throw new UnauthorizedException(AuthMessage.LoginAgain);
    const { id } = user;
    const result = await this.findOneById(id);
    return result;
  }

  async findMyProfile() {
    const { user } = this?.request;
    if (!user) throw new UnauthorizedException(AuthMessage.LoginAgain);
    const { id } = user;
    const result = await this.userRepository.findOneBy({ id });
    if (!result) throw new NotFoundException(NotFoundMessage.UserNotFount);
    return result;
  }

  async findOneById(id: number) {
    const result = await this.userRepository.findOneBy({ id });
    if (!result) throw new NotFoundException(NotFoundMessage.UserNotFount);
    return result;
  }

  async findOneByUsername(username: string) {
    const result = await this.userRepository.findOneBy({ username });
    if (!result) throw new NotFoundException(NotFoundMessage.UserNotFount);
    return result;
  }

  async update(updateUserDto: UpdateUserDto) {
    const { user } = this?.request;
    const { id } = user;

    let { username, first_name, last_name, email } = updateUserDto;

    if (!username) {
      username = user.username;
    } else {
      const usernameCheck = await this.userRepository.findOneBy({ username });
      if (usernameCheck)
        throw new ConflictException(UserMessage.ConflictUsername);
    }

    if (!email) email = user.email;
    else {
      const emailCheck = await this.userRepository.findOneBy({ email });
      if (emailCheck) throw new ConflictException(UserMessage.ConflictUsername);
    }
    if (!first_name) first_name = user.first_name;
    if (!last_name) last_name = user.last_name;

    this.userRepository.update(
      { id },
      { username, first_name, last_name, email },
    );
    return {
      message: UserMessage.Updated,
    };
  }

  async remove(id: number) {
    // send OTP to user
    //  if otp is correct
    // delete the user
    return `This action removes a #${id} user`;
  }
}
