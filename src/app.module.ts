import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as Joi from 'joi';
import { getConfig } from './common/config';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().default(5000),
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASS: Joi.string().allow(''),
        MYSQL_DBNAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRoot(),
    UserModule,
    EventModule,
    FeedbackModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
