import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import {CreateRoleDto, UpdateRoleDto} from "../../users/dtos/role.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>
  ) {
  }
  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id: id } });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async findByType(type: string) {
    return this.categoryRepo.find({
      where: {
        type,
      },
    });
  }

  async create(data: CreateCategoryDto) {
    try {
      const newCategory = this.categoryRepo.create(data);
      return this.categoryRepo.save(newCategory);
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException(`category #${id} not found`);
    }

    this.categoryRepo.merge(category, changes);

    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`category #${id} not found`);
    }

    return this.categoryRepo.delete(id);
  }
}
