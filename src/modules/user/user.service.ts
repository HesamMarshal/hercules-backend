import { Inject, Injectable, Scope } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(@Inject(REQUEST) private request: Request) {}

  findAll() {
    return `This action returns all user`;
  }

  findOneById(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneByUsername(username: string) {
    return `This action returns a #${username} user`;
  }

  update(updateUserDto: UpdateUserDto) {
    const { user } = this?.request;
    console.log(user);

    return `This action updates a # user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
