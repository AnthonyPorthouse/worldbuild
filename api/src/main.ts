import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      maxAge: 300,
    },
  });
  await app.listen(3000);
}
bootstrap();
