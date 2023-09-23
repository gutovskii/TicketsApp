import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Event } from './event.entity';
import { User } from 'src/user/user.entity';

@Module({
  controllers: [EventController],
  imports: [MikroOrmModule.forFeature([Event, User])],
  providers: [EventService],
})
export class EventModule {}
