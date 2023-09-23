import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ default: '0.0' })
  @Transform((v) => +v.value)
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ default: 1337 })
  @Transform((v) => +v.value)
  @IsInt()
  @Min(1)
  maxPeopleCount: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  alreadyRegisteredCount = 0;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  placeName: string;

  @ApiProperty({ default: 'https://goo.gl/maps/dBk3f99LS2D44MXcA' })
  @IsUrl()
  @IsNotEmpty()
  placeLink: string;

  @ApiProperty({ default: new Date('12.30.2003') })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ default: new Date('12.31.2003') })
  @IsDateString()
  endDate: Date;
  
  @ApiProperty({ default: 1 })
  @IsInt()
  @Min(1)
  userId: number;
}
