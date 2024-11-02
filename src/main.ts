import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Start Server
  // const { PORT } = process.env;
  const PORT = 3000;
  await app.listen(PORT, () => {
    console.log(`Root:    http://localhost:${PORT}`);
    // console.log(`Swagger: http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
