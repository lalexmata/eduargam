import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/controllers/products.controller';
import { CategoriesController } from './products/controllers/categories.controller';
import { ProductsService } from './products/services/products.service';
import { PostsModule } from './posts/posts.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesService } from './products/services/categories.service';
import { DatabaseModule } from './database/database.module';
import { OpinionsModule } from './opinions/opinions.module';
import { MultimediaModule } from './multimedia/multimedia.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    PostsModule,
    ProductsModule,
    UsersModule,
    DatabaseModule,
    OpinionsModule,
    MultimediaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
