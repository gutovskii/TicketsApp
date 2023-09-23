import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { EventRepository } from '../event.respository';

@Injectable()
export class EventExistsPipe implements PipeTransform {
  constructor(private readonly eventRepository: EventRepository) {}

  async transform(id: number): Promise<number> {
    const isExists = await this.eventRepository.isExists(id);
    if (!isExists)
      throw new NotFoundException(`Event with id "${id}" not found`);
    return id;
  }
}
