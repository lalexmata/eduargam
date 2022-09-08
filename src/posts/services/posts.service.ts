import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostsDto, UpdatePostsDto } from '../dtos/posts.dtos';
import { CategoriesService } from '../../products/services/categories.service';
import {Category} from "../../products/entities/category.entity";


@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    private categoryService: CategoriesService,
  ) {
  }


  findAll() {
    return this.postRepo.find({
      relations: {
        categories: true,
      },
    });
  }

  findOne(id: number) {
    const post = this.postRepo.find({
      where: { id: id},
      relations: { categories: true}
    });

    if (!post) {
      throw new NotFoundException(`post #${id} not found`);
    }
    return post;
  }

  async create(data: CreatePostsDto) {
    const newPost = this.postRepo.create(data);

    if(data.categories_id){
      const categories = await this.categoryRepo.findByIds(data.categories_id);

      if (categories) {
        newPost.categories = categories;
      }
    }

    return this.postRepo.save(newPost);
  }

  async update(id: number, changes: UpdatePostsDto) {
    const post = this.postRepo.find({
      where: { id: id},
      relations: { categories: true}
    });

    if(!post){
      throw new NotFoundException(`post #${id} not found`);
    }

    if(changes.categories_id){
      const categories = await this.categoryRepo.findByIds(
        changes.categories_id,
      );
      console.log(categories);
    }

  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    const deleteUser = await this.postRepo.delete(id);

    if (!deleteUser) {
      return {
        error: true,
        msj: 'Post not deleted',
      };
    }

    return {
      error: false,
      msj: 'Post deleted successfull',
    };
  }

  async removeCategoryByPost(post_id: number, category_id: number){
    const post = await this.postRepo.findOne( {
      where: { id: post_id },
      relations: {
        categories: true
      }
    });

    if(post){
      post.categories = post.categories.filter((item) => item.id !== category_id);
    }

    return this.postRepo.save(post);
  }
}
