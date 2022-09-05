import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostsService } from '../services/posts.service';
import {CreateUserDto, UpdateUserDto} from "../../users/dtos/user.dto";
import { CreatePostsDto, UpdatePostsDto} from "../dtos/posts.dtos";

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreatePostsDto) {
    return this.postsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePostsDto,
  ) {
    return this.postsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(+id);
  }
}
