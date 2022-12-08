import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MultimediaService } from '../../multimedia/services/multimedia.service';
import { Multimedia } from '../../multimedia/entities/multimedia.entity';
import { CategoriesService } from './categories.service';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Multimedia)
    private multimediatRepo: Repository<Multimedia>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}
  private counterId = 1;
  private products: Product[] = [];

  findAll() {
    return this.productRepo.find({
      relations: {
        categories: true,
        multimedia: true,
      },
    });
  }

  findOne(id: number) {
    const product = this.productRepo.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException(`Product ${id} not Found`);
    }

    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.categories_id) {
      const categories = await this.categoryRepo.findByIds(data.categories_id);

      if (categories) {
        newProduct.categories = categories;
      }
    }

    if (data.image) {
      const multimedia = await this.multimediatRepo.create({
        uri: data.image,
        extension: 'png,',
      });
      await this.multimediatRepo.save(multimedia);

      newProduct.multimedia = multimedia;
    }

    return this.productRepo.save(newProduct);
  }

  update(id: number, payload: UpdateProductDto) {
    /*const product = this.findOne(id);
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];*/
  }

  remove(id: number) {
    /*const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;*/
  }
}
