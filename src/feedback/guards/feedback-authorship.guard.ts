import { UserPayload } from '@/src/auth/dto/user-payload.dto';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { FeedbackRepository } from '../feedback.repository';

@Injectable()
export class FeedbackAuthorshipGuard implements CanActivate {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const userPayload = req.user as UserPayload;
    const feedback = await this.feedbackRepository.findOne(+req.params.id);
    return feedback.author.id === userPayload.id;
  }
}
