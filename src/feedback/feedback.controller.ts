import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ValidateFeedbackPipe } from './pipes/validate-feedback.pipe';
import { FeedbackExistsPipe } from './pipes/feedback-exists.pipe';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginateFeedbacksDto } from './dto/paginate-feedbacks.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FeedbackAuthorshipGuard } from './guards/feedback-authorship.guard';

@Controller('feedback')
@ApiTags('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  @ApiQuery({ name: 'eventId', required: false })
  @ApiQuery({ name: 'count', required: false })
  @ApiQuery({ name: 'page', required: false })
  paginateFeedbacks(@Query() dto: PaginateFeedbacksDto) {
    return this.feedbackService.paginate(dto);
  }

  @Post()
  @JwtAuthGuard()
  createFeedback(@Body(ValidateFeedbackPipe) dto: CreateFeedbackDto) {
    return this.feedbackService.create(dto);
  }

  @Delete(':id')
  @JwtAuthGuard()
  @UseGuards(FeedbackAuthorshipGuard)
  deleteFeedback(@Param('id', FeedbackExistsPipe) id: number) {
    return this.feedbackService.delete(id);
  }
}
