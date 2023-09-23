import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Feedback } from './feedback.entity';
import { User } from '../user/user.entity';
import { Event } from '../event/event.entity';

@Module({
  controllers: [FeedbackController],
  imports: [MikroOrmModule.forFeature([Feedback, User, Event])],
  providers: [FeedbackService],
})
export class FeedbackModule {}
