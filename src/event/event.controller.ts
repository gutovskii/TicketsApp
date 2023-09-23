import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EventUserRelationDto } from './dto/event-user-relation.dto';
import { EventExistsPipe } from './pipes/event-exists.pipe';
import { PaginateEventsDto } from './dto/paginate-events.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EventAuthorshipGuard } from './guards/event-authorship.guard';

@Controller('events')
@ApiTags('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiQuery({ name: 'count', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  paginateEvents(@Query() dto: PaginateEventsDto) {
    return this.eventService.paginate(dto);
  }

  @Get(':id')
  findOneEvent(@Param('id', EventExistsPipe) id: number) {
    return this.eventService.findOne(id);
  }

  @Post()
  @JwtAuthGuard()
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @Post('sign-up/:eventId/participant/:userId')
  @JwtAuthGuard()
  @ApiParam({ name: 'eventId' })
  @ApiParam({ name: 'userId' })
  signUpForEvent(@Param() params: EventUserRelationDto) {
    return this.eventService.signUp(params);
  }

  @Post('opt-out/:eventId/participant/:userId')
  @JwtAuthGuard()
  @ApiParam({ name: 'eventId' })
  @ApiParam({ name: 'userId' })
  optOutOfEvent(@Param() params: EventUserRelationDto) {
    return this.eventService.optOut(params);
  }

  @Put('start/:id')
  @UseGuards(EventAuthorshipGuard)
  @JwtAuthGuard()
  startEvent(@Param('id', EventExistsPipe) id: number) {
    return this.eventService.start(id);
  }

  @Put('stop/:id')
  @JwtAuthGuard()
  @UseGuards(EventAuthorshipGuard)
  stopEvent(@Param('id', EventExistsPipe) id: number) {
    return this.eventService.stop(id);
  }

  @Put('end/:id')
  @JwtAuthGuard()
  @UseGuards(EventAuthorshipGuard)
  endEvent(@Param('id', EventExistsPipe) id: number) {
    return this.eventService.end(id);
  }
}
