import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLE_KEY } from '../../../common/decorators/role.decorator';
import { Roles } from '../../../common/enum/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length == 0) return true;

    const request: Request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    const userRole = user?.role ?? Roles.CLIENT;
    if (user.role === Roles.ADMIN) return true;
    if (requiredRoles.includes(userRole as Roles)) return true;
    // TODO: Create message Forbidden
    throw new ForbiddenException(
      `User with role ${user.role} is not authorized to access this resource. Required roles: ${requiredRoles.join(', ')}`,
    );
  }

  //  TODO: create unit test for it
}
