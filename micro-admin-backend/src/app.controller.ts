import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Categoria } from './interfaces/categorias/categoria.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private logger = new Logger(AppController.name);

  @EventPattern('criar-categoria')
  async criarCategoria(@Payload() categoria: Categoria) {
    this.logger.log(`categoria: ${JSON.stringify(categoria)}`);
    await this.appService.criarCategoria(categoria);
  }

  @MessagePattern('consultar-categorias')
  async buscarCategorias(@Payload() _id: string) {
    return this.appService.buscarCategorias(_id);
  }

  @MessagePattern('consultar-todas-categorias')
  async buscarTodasCategorias() {
    return this.appService.buscarCategorias('');
  }
}
