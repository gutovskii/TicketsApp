import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import cors from 'cors';
import { AppModule } from './app.module';
import { config } from './common/config';
import { OPENAPI_JWT_NAME } from './auth/guards/jwt-auth.guard';

console.time('bootstrap');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DEETE'],
    }),
  );

  const configService = app.get(ConfigService);
  const PORT = configService.get<typeof config.port>('port');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tickets App')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      OPENAPI_JWT_NAME,
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  console.timeEnd('bootstrap');
}
bootstrap();
