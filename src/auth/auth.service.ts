import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EntityManager } from '@mikro-orm/mysql';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { User } from '../user/user.entity';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from '../user/user.repository';

export const SALT_ROUNDS = 6;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly em: EntityManager,
    private readonly userRepository: UserRepository,
  ) {}

  async login(dto: LoginDto): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({ nickname: dto.nickname });
    if (!user)
      throw new BadRequestException(
        `User with nickname ${dto.nickname} does not exist`,
      );

    const isPasswordCorrect = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordCorrect) throw new BadRequestException('Incorrect password');

    const token = await this.getTokenFromUser(user);
    return { token };
  }

  async register(dto: RegisterDto): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({ nickname: dto.nickname });
    if (user)
      throw new BadRequestException(
        `User with nickname "${dto.nickname}" is already exists`,
      );

    const newUser = plainToInstance(User, dto);
    newUser.passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    await this.em.persistAndFlush(newUser);

    const token = await this.getTokenFromUser(newUser);
    return { token };
  }

  private getTokenFromUser(user: User): Promise<string> {
    const { passwordHash, createdEvents, registeredEvents, ...publicUserData } =
      user;
    const payload = { ...publicUserData };
    return this.jwtService.signAsync(payload);
  }
}
