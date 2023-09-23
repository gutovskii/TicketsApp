import { Injectable } from '@nestjs/common';
import { FeedbackRepository } from './feedback.repository';
import { PaginationResult } from '../common/pagination-result.dto';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UserRepository } from '../user/user.repository';
import { EventRepository } from '../event/event.respository';
import { EntityManager } from '@mikro-orm/mysql';
import { PaginateFeedbacksDto } from './dto/paginate-feedbacks.dto';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly em: EntityManager,
    private readonly feedbackRepository: FeedbackRepository,
    private readonly userRepository: UserRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  async paginate(
    dto: PaginateFeedbacksDto,
  ): Promise<PaginationResult<Feedback>> {
    const [items, totalCount] = await this.feedbackRepository.paginate(dto);
    return {
      items,
      currentPage: dto.page,
      totalPages: Math.ceil(totalCount / dto.count),
      count: items.length,
      totalCount,
    };
  }

  async create(dto: CreateFeedbackDto) {
    const author = this.userRepository.getReference(dto.userId);
    const event = this.eventRepository.getReference(dto.eventId);

    const feedbackToCreate = this.feedbackRepository.create(dto);
    feedbackToCreate.author = author;
    feedbackToCreate.event = event;
    await this.em.flush();
  }

  async delete(id: number) {
    const feedbackToDelete = this.feedbackRepository.getReference(id);
    await this.em.remove(feedbackToDelete).flush();
  }
}
