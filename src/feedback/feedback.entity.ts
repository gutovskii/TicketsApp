import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Event } from '@/src/event/event.entity';
import { User } from '@/src/user/user.entity';
import { FeedbackRepository } from './feedback.repository';

@Entity({ customRepository: () => FeedbackRepository })
export class Feedback {
  @PrimaryKey()
  id: number;

  @Property({ length: 512 })
  text: string;

  @ManyToOne(() => Event)
  event: Event;

  @ManyToOne(() => User)
  author: User;

  [EntityRepositoryType]?: FeedbackRepository;
}
