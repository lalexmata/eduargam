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
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './common/enviroments';
import { ConveniosModule } from './convenios/convenios.module';
import config from './config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    PostsModule,
    ProductsModule,
    UsersModule,
    DatabaseModule,
    OpinionsModule,
    MultimediaModule,
    AuthModule,
    ConveniosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
