import { Transform } from 'class-transformer';
import { IsInt, IsString, Min } from 'class-validator';

export class PaginateEventsDto {
  @Transform((v) => +v.value)
  @IsInt()
  @Min(1)
  page = 1;

  @Transform((v) => +v.value)
  @IsInt()
  @Min(1)
  count = 5;

  @IsString()
  search = '';
}
