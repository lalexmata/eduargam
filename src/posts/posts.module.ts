import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { Posts } from './providers/posts';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CategoriesService } from '../products/services/categories.service';
import { Category } from '../products/entities/category.entity';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([Post, Category])],
  controllers: [PostsController],
  providers: [PostsService, Posts, CategoriesService],
  exports: [CategoriesService],
})
export class PostsModule {}
