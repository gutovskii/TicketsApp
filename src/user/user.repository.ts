import { EntityRepository } from '@mikro-orm/mysql';
import { User } from './user.entity';

export class UserRepository extends EntityRepository<User> {
  async isExists(id: number) {
    return !!(await this.findOne(id, { fields: ['id'] }));
  }
}
