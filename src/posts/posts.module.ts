import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { Posts } from './providers/posts';

@Module({
  controllers: [PostsController],
  providers: [PostsService, Posts]
})
export class PostsModule {}
