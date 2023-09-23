import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fathername: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ default: 'ticket@tickets.ua' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDateString()
  birthday: Date;

  @ApiProperty()
  @IsString()
  @Length(6)
  password: string;
}
