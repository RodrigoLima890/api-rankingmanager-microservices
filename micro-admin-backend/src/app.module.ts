import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './interfaces/categorias/categoria.schema';
import { JogadorSchema } from './interfaces/jogadores/jogador.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rodrigolima90017:G4CFq4I1iPMQWUBS@cluster0.sdryddq.mongodb.net/admRakingManager?retryWrites=true&w=majority&appName=Cluster0',
    ),
    MongooseModule.forFeature([
      {
        name: 'Categoria',
        schema: CategoriaSchema,
      },
      {
        name: 'Jogador',
        schema: JogadorSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
