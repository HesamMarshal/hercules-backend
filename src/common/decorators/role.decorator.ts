import { SetMetadata } from '@nestjs/common';
import { Roles } from '../enum/role.enum';

// TODO: Change to export const ROLE_KEY = 'roles'; does not create conflicts?
export const ROLE_KEY = 'ROLES';
export const CanAccess = (...roles: Roles[]) => SetMetadata(ROLE_KEY, roles);
