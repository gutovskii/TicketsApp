import { EntityManager } from '@mikro-orm/mysql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { PaginationResult } from '../common/pagination-result.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { EventUserRelationDto } from './dto/event-user-relation.dto';
import { PaginateEventsDto } from './dto/paginate-events.dto';
import { EventStatus } from './enums/event-status.enum';
import { Event } from './event.entity';
import { EventRepository } from './event.respository';

@Injectable()
export class EventService {
  constructor(
    private readonly em: EntityManager,
    private readonly eventRepository: EventRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async paginate(dto: PaginateEventsDto): Promise<PaginationResult<Event>> {
    const [items, totalCount] = await this.eventRepository.paginate(dto);
    return {
      items,
      currentPage: dto.page,
      totalPages: Math.ceil(totalCount / dto.count),
      count: items.length,
      totalCount,
    };
  }

  async findOne(id: number): Promise<Event> {
    return this.eventRepository.findOne(id, {
      populate: ['author'],
    });
  }

  async create(dto: CreateEventDto): Promise<Event> {
    const eventToCreate = this.eventRepository.create(dto);
    eventToCreate.author = await this.userRepository.findOne(dto.userId);
    await this.em.persistAndFlush(eventToCreate);
    return eventToCreate;
  }

  async signUp(dto: EventUserRelationDto) {
    const event = await this.eventRepository.findOne(dto.eventId);
    if (!event)
      throw new NotFoundException(`Event with id "${dto.eventId}" not found`);
    const isParticipantExists = await this.userRepository.isExists(dto.userId);
    if (!isParticipantExists)
      throw new NotFoundException(`User with id "${dto.userId}" not found`);

    const participant = this.userRepository.getReference(dto.userId);
    event.registeredUsers.add(participant);
    event.alreadyRegisteredCount++;
    await this.em.flush();
    return event;
  }

  async optOut(dto: EventUserRelationDto) {
    const event = await this.eventRepository.findOne(dto.eventId, {
      populate: ['registeredUsers'],
    });
    if (!event)
      throw new NotFoundException(`Event with id "${dto.eventId}" not found`);
    const isParticipantExists = await this.userRepository.isExists(dto.userId);
    if (!isParticipantExists)
      throw new NotFoundException(`User with id "${dto.userId}" not found`);

    const participant = this.userRepository.getReference(dto.userId);
    event.registeredUsers.remove(participant);
    event.alreadyRegisteredCount--;
    await this.em.flush();
    return event;
  }

  async start(id: number) {
    const eventToStart = this.eventRepository.getReference(id);
    eventToStart.status = EventStatus.STARTED;
    await this.em.flush();
  }

  async stop(id: number) {
    const eventToStop = this.eventRepository.getReference(id);
    eventToStop.status = EventStatus.STOPPED;
    await this.em.flush();
  }

  async end(id: number) {
    const eventToEnd = this.eventRepository.getReference(id);
    eventToEnd.status = EventStatus.ENDED;
    await this.em.flush();
  }
}
