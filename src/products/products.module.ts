import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { Category } from './entities/category.entity';
import { PostsModule } from '../posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { MultimediaService } from '../multimedia/services/multimedia.service';
import { MultimediaController } from '../multimedia/controllers/multimedia.controller';
import { Multimedia } from '../multimedia/entities/multimedia.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/entities/role.entity';
import { UsersService } from '../users/services/users.service';
import { RolesService } from '../users/services/roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product, Multimedia, User, Role]),
  ],
  controllers: [CategoriesController, ProductsController, MultimediaController],
  providers: [
    CategoriesService,
    Category,
    ProductsService,
    MultimediaService,
    UsersService,
    RolesService,
  ],
  exports: [CategoriesService, ProductsService],
})
export class ProductsModule {}
