import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { config } from '../common/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../user/user.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtModuleOptions: JwtModuleOptions = {
          secret: configService.get<typeof config.jwt.secret>('jwt.secret'),
          signOptions: {
            expiresIn:
              configService.get<typeof config.jwt.expiresIn>('jwt.expiresIn'),
          },
        };
        return jwtModuleOptions;
      },
    }),
    MikroOrmModule.forFeature([User]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
