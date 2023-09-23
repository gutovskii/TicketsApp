import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { FeedbackRepository } from '../feedback.repository';

@Injectable()
export class FeedbackExistsPipe implements PipeTransform {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}
  async transform(id: number): Promise<number> {
    const isExists = await this.feedbackRepository.isExists(id);
    if (!isExists)
      throw new NotFoundException(`Feedback with id "${id}" not found`);
    return id;
  }
}
