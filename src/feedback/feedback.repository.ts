import { EntityRepository } from '@mikro-orm/mysql';
import { Feedback } from './feedback.entity';
import { PaginateFeedbacksDto } from './dto/paginate-feedbacks.dto';

export class FeedbackRepository extends EntityRepository<Feedback> {
  paginate(dto: PaginateFeedbacksDto) {
    return this.findAndCount(
      {},
      {
        limit: dto.count,
        offset: (dto.page - 1) * dto.count,
        populateWhere: {
          event: { id: dto.eventId },
        },
      },
    );
  }

  async isExists(id: number) {
    return !!(await this.findOne(id, { fields: ['id'] }));
  }
}
