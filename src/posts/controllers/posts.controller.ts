import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import { PostsService } from '../services/posts.service';
import {CreateUserDto, UpdateUserDto} from "../../users/dtos/user.dto";
import { CreatePostsDto, UpdatePostsDto} from "../dtos/posts.dtos";

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los Post'})
  getAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un Post por su id'})
  get(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo Post'})
  create(@Body() payload: CreatePostsDto) {
    return this.postsService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edita un Post existente por su id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePostsDto,
  ) {
    return this.postsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un Post existente por su id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(+id);
  }
}
