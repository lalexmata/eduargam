import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  findAll() {
    return this.roleRepo.find();
  }

  async findOne(id: number) {
    const role = await this.roleRepo.findOne({ where: { id: id } });

    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return role;
  }

  async findByName(name: string) {
    return this.roleRepo.findOne({
      where: {
        name,
      },
    });
  }

  async create(data: CreateRoleDto) {
    try {
      const newRole = this.roleRepo.create(data);
      return this.roleRepo.save(newRole);
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  }

  async update(id: number, changes: UpdateRoleDto) {
    const role = await this.findOne(id);

    if (!role) {
      throw new NotFoundException(`role #${id} not found`);
    }

    this.roleRepo.merge(role, changes);

    return this.roleRepo.save(role);
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    if (!role) {
      throw new NotFoundException(`role #${id} not found`);
    }

    return this.roleRepo.delete(id);
  }
}
