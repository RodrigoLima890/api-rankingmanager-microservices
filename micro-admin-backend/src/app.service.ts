import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interfaces/categorias/categoria.interface';
import { Jogador } from './interfaces/jogadores/jogador.interface';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(AppService.name);

  async criarCategoria(categoria: Categoria): Promise<Categoria> {
    try {
      const categoriaCriada = new this.categoriaModel(categoria);
      return await categoriaCriada.save();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async buscarTodasCategorias(): Promise<Categoria[]> {
    return await this.categoriaModel.find().exec();
  }

  async buscarCategoriaPorId(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria: categoria })
      .exec();

    if (!categoriaEncontrada)
      throw new NotFoundException('Categoria não encontrada');

    return categoriaEncontrada;
  }

  async buscarCategorias(_id: string) {
    try {
      if (_id) {
        return await this.buscarCategoriaPorId(_id);
      }
      return await this.buscarTodasCategorias();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }
}
