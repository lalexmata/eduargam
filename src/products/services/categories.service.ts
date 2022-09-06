import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  private counterId = 10;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Construcción',
      type: 'posts',
      image:
        'https://images.pexels.com/photos/8447803/pexels-photo-8447803.jpeg?cs=srgb&dl=pexels-los-muertos-crew-8447803.jpg&fm=jpg',
    },
    {
      id: 2,
      name: 'Remodelación',
      type: 'posts',
      image:
        'https://images.pexels.com/photos/8447773/pexels-photo-8447773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 3,
      name: 'Electricidad',
      type: 'posts',
      image:
        'https://media.istockphoto.com/photos/electricity-and-electrical-maintenance-service-engineer-hand-holding-picture-id1402667949?k=20&m=1402667949&s=612x612&w=0&h=MQMniCyGXTwg_wJZOzABXwUpFhlZwKGzPHYFZL5jRUM=',
    },
    {
      id: 4,
      name: 'Mueblería',
      type: 'posts',
      image:
        'https://images.pexels.com/photos/8447773/pexels-photo-8447773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 5,
      name: 'Paisajismo',
      type: 'posts',
      image:
        'https://images.pexels.com/photos/8447773/pexels-photo-8447773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 6,
      name: 'Pintura',
      type: 'posts',
      image:
        'https://images.pexels.com/photos/8447773/pexels-photo-8447773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 7,
      name: 'Climatización',
      type: 'posts',
      image:
        'https://media.istockphoto.com/photos/technician-repairing-air-conditioner-picture-id1308375294?b=1&k=20&m=1308375294&s=612x612&w=0&h=oPQiZ4auN--8BKE9YCwSaqpEmmrUVPJHAcyUIk1ORTU=',
    },
    {
      id: 8,
      name: 'Gasfitería',
      type: 'posts',
      image:
        'https://images.pexels.com/photos/8447773/pexels-photo-8447773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 9,
      name: 'Tecnología',
      type: 'products',
      image: '',
    },
    {
      id: 10,
      name: 'Mano de Obra',
      type: 'products',
      image: '',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return category;
  }

  findByType(type: string){
    const category = this.categories.filter((item) => item.type === type);
    if (!category) {
      throw new NotFoundException(`Category type #${type} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    const index = this.categories.findIndex((item) => item.id === id);
    this.categories[index] = {
      ...category,
      ...payload,
    };
    return this.categories[index];
  }

  remove(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
