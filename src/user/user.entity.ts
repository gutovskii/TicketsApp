import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UserRepository } from './user.repository';
import { Event } from '@/src/event/event.entity';

@Entity({ customRepository: () => UserRepository })
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  surname: string;

  @Property()
  fathername: string;

  @Property({ unique: true })
  nickname: string;

  @Property({ unique: true })
  email: string;

  @Property({ type: 'date' })
  birthday = new Date();

  @Property()
  passwordHash: string;

  @OneToMany(() => Event, (event) => event.author)
  createdEvents = new Collection<Event>(this);

  @ManyToMany(() => Event, (event) => event.registeredUsers)
  registeredEvents = new Collection<Event>(this);

  [EntityRepositoryType]?: UserRepository;
}
