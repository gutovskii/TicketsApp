import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginateFeedbacksDto {
  @Transform((v) => +v.value)
  @IsInt()
  @Min(1)
  page = 1;

  @Transform((v) => +v.value)
  @IsInt()
  @Min(1)
  count = 5;

  @Transform((v) => +v.value)
  @IsInt()
  @Min(1)
  eventId: number;
}
