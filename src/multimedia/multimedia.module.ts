import { Module } from '@nestjs/common';
import { MultimediaService } from './services/multimedia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Multimedia } from './entities/multimedia.entity';
import { MultimediaController } from './controllers/multimedia.controller';
import {Product} from "../products/entities/product.entity";
import {ProductsModule} from "../products/products.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Multimedia, Product])],
  providers: [MultimediaService],
  exports: [MultimediaService],
  controllers: [MultimediaController],
})
export class MultimediaModule {}
