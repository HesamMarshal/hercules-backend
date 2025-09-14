import {
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
import { AuthMessage, NotFoundMessage } from 'src/common/messages/message.enum';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    // This should work for admin only
    //  TODO: Pagination and order by
    const result = this.userRepository.find();
    return result;
  }

  async findMyProfile() {
    console.log('in service');
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

  async updateUsername(updateUserDto: UpdateUserDto) {
    const { user } = this?.request;
    console.log(user);

    return `This action updates a # user`;
  }

  async update(updateUserDto: UpdateUserDto) {
    const { user } = this?.request;
    console.log(user);

    return `This action updates a # user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
