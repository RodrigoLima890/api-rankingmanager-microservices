import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CriaCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);

  private proxy: ClientProxy;

  constructor() {
    this.proxy = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://root:123@localhost:5672/rankingmanage'],
        queue: 'admin-backend',
      },
    });
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  async criarCategoria(@Body() criarCategoriaDto: CriaCategoriaDto) {
    return await this.proxy.emit('criar-categoria', criarCategoriaDto);
  }
}
