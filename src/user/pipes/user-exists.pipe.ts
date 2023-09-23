import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserExistsPipe implements PipeTransform {
  constructor(private readonly userRepository: UserRepository) {}

  async transform(id: number): Promise<number> {
    const isExists = await this.userRepository.isExists(id);
    if (!isExists)
      throw new NotFoundException(`User with id "${id}" not found`);
    return id;
  }
}
