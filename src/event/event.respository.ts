import { EntityRepository } from '@mikro-orm/mysql';
import { PaginateEventsDto } from './dto/paginate-events.dto';
import { Event } from './event.entity';

export class EventRepository extends EntityRepository<Event> {
  paginate(dto: PaginateEventsDto) {
    return this.findAndCount(
      {
        name: { $like: `%${dto.search}%` },
      },
      {
        limit: dto.count,
        offset: (dto.page - 1) * dto.count,
        populate: ['author'],
      },
    );
  }

  async isExists(id: number) {
    return !!(await this.findOne(id, { fields: ['id'] }));
  }
}
