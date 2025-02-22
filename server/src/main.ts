import { NestFactory } from '@nestjs/core';
import {Logger, ValidationPipe} from '@nestjs/common';

import { AppModule } from './app.module';


/**
 * Initializes and starts the NestJS application.
 *
 * Sets global API prefix, enables CORS, and adds shutdown hooks.
 * The server listens on the port 8080.
 */
async function bootstrap(): Promise<void> {
  const PORT: 8080 = 8080;

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    skipMissingProperties: false,
  }));

  await app.listen(PORT, (): void => {
    Logger.log(`http://localhost:${PORT}`, `Server starts on host`);
  });
}

bootstrap();