import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CriaCategoriaDto } from './dtos/criar-categoria.dto';
import { Observable } from 'rxjs';

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
  criarCategoria(@Body() criarCategoriaDto: CriaCategoriaDto) {
    this.proxy.emit('criar-categoria', criarCategoriaDto);
  }

  @Get('categorias/:idCategoria')
  consultarCategorias(@Query('idCategoria') _id: string): Observable<any> {
    return this.proxy.send('consultar-categorias', _id ? _id : '');
  }

  @Get('categorias')
  consultarTodasCategorias(): Observable<any> {
    return this.proxy.send('consultar-todas-categorias', '');
  }
}
