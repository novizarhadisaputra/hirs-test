import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true });
  await app.listen(3000);
}
bootstrap();
