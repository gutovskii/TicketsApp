import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class EventUserRelationDto {
  @ApiProperty()
  @Transform((v) => +v.value)
  @IsInt()
  @Min(1)
  eventId: number;

  @ApiProperty()
  @Transform((v) => +v.value)
  @IsInt()
  @Min(1)
  userId: number;
}
