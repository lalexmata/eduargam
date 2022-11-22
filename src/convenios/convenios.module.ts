import { Module } from '@nestjs/common';
import { ConveniosController } from './controllers/convenios.controller';
import { ConveniosService } from './services/convenios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convenio } from './entities/convenio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Convenio])],
  controllers: [ConveniosController],
  providers: [ConveniosService],
})
export class ConveniosModule {}
