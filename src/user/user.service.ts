import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findOne(id: number) {
    return this.userRepository.findOne(id, {
      populate: ['createdEvents', 'registeredEvents'],
    });
  }

  async findUserCreatedEvents(id: number) {
    const user = await this.userRepository.findOne(id, {
      populate: ['createdEvents.author'],
    });
    return user.createdEvents;
  }

  async findUserRegisteredEvents(id: number) {
    const user = await this.userRepository.findOne(id, {
      populate: ['registeredEvents.author'],
    });
    return user.registeredEvents;
  }
}
