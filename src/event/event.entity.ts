import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from '@/src/user/user.entity';
import { EventStatus } from './enums/event-status.enum';
import { EventRepository } from './event.respository';
import { Feedback } from '../feedback/feedback.entity';

@Entity({ customRepository: () => EventRepository })
export class Event {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({ length: 512 })
  description: string;

  @Property()
  price: number;

  @Property()
  maxPeopleCount: number;

  @Property({ default: 0 })
  alreadyRegisteredCount: number;

  @Property()
  placeName: string;

  @Property()
  placeLink: string;

  @Enum({ items: () => EventStatus, default: EventStatus.NOT_STARTED })
  status: EventStatus;

  @Property()
  startDate = new Date();

  @Property()
  endDate = new Date();

  @ManyToOne(() => User)
  author: User;

  @ManyToMany(() => User, 'registeredEvents', { owner: true })
  registeredUsers = new Collection<User>(this);

  @OneToMany(() => Feedback, (feedback) => feedback.event)
  feedbacks = new Collection<Feedback>(this);

  [EntityRepositoryType]?: EventRepository;
}
