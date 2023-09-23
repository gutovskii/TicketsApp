import { UserPayload } from '@/src/auth/dto/user-payload.dto';
import { UserRepository } from '@/src/user/user.repository';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class EventAuthorshipGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const userPayload = req.user as UserPayload;
    const user = await this.userRepository.findOne(userPayload.id, {
      populate: ['createdEvents'],
    });
    return user.createdEvents
      .toArray()
      .some((event) => event.id === +req.params.id);
  }
}
