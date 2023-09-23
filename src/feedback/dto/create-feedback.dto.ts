import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({ default: 1 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 512)
  text: string;

  @ApiProperty({ default: 1 })
  @Transform((v) => +v.value)
  @IsInt()
  @Min(1)
  eventId: number;

  @ApiProperty({ default: 1 })
  @Transform((v) => +v.value)
  @IsInt()
  @Min(1)
  userId: number;
}
