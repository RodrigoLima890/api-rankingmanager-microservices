import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://root:123@localhost:5672/rankingmanage'],
      queue: 'admin-backend',
    },
  });

  await app.listen();
}
bootstrap();
