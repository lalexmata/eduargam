import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from './roles.service';
import {Role} from "../entities/role.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private roleService: RolesService,
  ) {
  }


  findAll() {
    return this.userRepo.find({
      relations: {
        role: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id: id },
      relations: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: {
        email,
      },
    });
  }

  async create(data: CreateUserDto) {
    try {
      const newUser = this.userRepo.create(data);
      const hashPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashPassword;

      if (data.role_id) {
        const role = await this.roleService.findOne(data.role_id);
        if (role) {
          newUser.role = role;
        }
      }
      return this.userRepo.save(newUser);
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    if (changes.role_id) {
      const role = await this.roleService.findOne(changes.role_id);
      if (role) {
        user.role = role;
      }
    }
    this.userRepo.merge(user, changes);

    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepo.delete(id);
  }
}
