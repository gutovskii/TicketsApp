import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

export const OPENAPI_JWT_NAME = 'jwt-token';

class PassportAuthGuard extends AuthGuard('jwt') {}
export function JwtAuthGuard() {
  return applyDecorators(
    ApiBearerAuth(OPENAPI_JWT_NAME),
    UseGuards(PassportAuthGuard),
  );
}
