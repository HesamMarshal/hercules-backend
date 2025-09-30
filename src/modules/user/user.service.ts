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
import { AuthMessage } from '../../common/messages/message.enum';
import { UserMessage } from './messages/messages.enum';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findMyProfile() {
    if (!this.request?.user) {
      throw new UnauthorizedException(AuthMessage.LoginAgain);
    }
    const { user } = this?.request;
    const { id } = user;
    const result = await this.userRepository.findOneBy({ id });
    if (!result) throw new NotFoundException(UserMessage.NotFound);
    return {
      message: UserMessage.Found,
      data: result,
    };
  }

  async findOneById(id: number) {
    const result = await this.userRepository.findOneBy({ id });
    if (!result) throw new NotFoundException(UserMessage.NotFound);
    return {
      message: UserMessage.Found,
      data: result,
    };
  }

  async findOneByUsername(username: string) {
    console.log(username);
    const result = await this.userRepository.findOneBy({ username });
    console.log(result);
    if (!result) throw new NotFoundException(UserMessage.NotFound);
    const modifiedResult = {
      username,
      first_name: result.first_name,
      last_name: result.last_name,
      birth_date: result.birth_date,
      score: result.score,
      joined: result.created_at,
    };

    return {
      message: UserMessage.Found,
      data: modifiedResult,
    };
  }

  async update(updateUserDto: UpdateUserDto) {
    if (!this.request?.user) {
      throw new UnauthorizedException(AuthMessage.LoginAgain);
    }
    const { user } = this?.request;
    const { id } = user;
    let { username, first_name, last_name, email, birth_date } = updateUserDto;
    username = username.toLowerCase();

    // TODO: Check the username to have no space and special characters
    if (!username) username = user.username;
    else {
      if (user.username !== username) {
        const usernameCheck = await this.userRepository.findOneBy({ username });
        if (usernameCheck)
          throw new ConflictException(UserMessage.ConflictUsername);
      }
    }

    if (!email) email = user.email;
    else {
      if (user.email !== email) {
        const emailCheck = await this.userRepository.findOneBy({ email });
        if (emailCheck) throw new ConflictException(UserMessage.ConflictEmail);
      }
    }
    if (!first_name) first_name = user.first_name;
    if (!last_name) last_name = user.last_name;
    if (!birth_date) birth_date = user.birth_date;
    else birth_date = new Date(birth_date);

    username = username.toLowerCase();
    this.userRepository.update(
      { id },
      { username, first_name, last_name, email, birth_date },
    );
    return {
      message: UserMessage.Updated,
    };
  }

  async remove() {
    const { id } = this.request.user;
    const user = await this.userRepository.findOneBy({ id });
    // TODO: We need more verifications
    this.userRepository.remove(user);

    return { message: UserMessage.Deleted };
  }

  // Helper functions
  async findCurrentUser() {
    if (!this.request?.user) {
      throw new UnauthorizedException(AuthMessage.LoginAgain);
    }
    const { user } = this?.request;
    const { id } = user;
    const result = await this.findOneById(id);
    return result;
  }
}
