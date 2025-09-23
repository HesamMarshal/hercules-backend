import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerConfigInit } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configure Swagger
  SwaggerConfigInit(app);

  // Static folder
  app.useStaticAssets('public');

  // Increase payload size limit (default is 100kb)
  app.use(json({ limit: '10mb' })); // For JSON payloads
  app.use(urlencoded({ extended: true, limit: '10mb' })); // For URL-encoded payloads

  // Activate Validation
  app.useGlobalPipes(new ValidationPipe());

  // Activate Cookie Parser
  app.use(cookieParser(process.env.COOKIE_SECRET));

  // Start Server
  const { PORT = 3000 } = process.env;
  await app.listen(PORT, () => {
    console.log(`Root:    http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
