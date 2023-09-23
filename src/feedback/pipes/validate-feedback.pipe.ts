import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { UserRepository } from '@/src/user/user.repository';
import { EventRepository } from '@/src/event/event.respository';

@Injectable()
export class ValidateFeedbackPipe implements PipeTransform {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  async transform(dto: CreateFeedbackDto): Promise<CreateFeedbackDto> {
    const isUserExists = await this.userRepository.isExists(dto.userId);
    if (!isUserExists)
      throw new NotFoundException(`User with id "${dto.userId}" not found`);

    const isEventExists = await this.eventRepository.isExists(dto.eventId);
    if (!isEventExists)
      throw new NotFoundException(`Event with id "${dto.eventId}" not found`);

    return dto;
  }
}
