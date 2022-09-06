import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {
  }

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  findAll() {
    return this.userRepo.find();

  }

  async findOne(id: number) {
    // @ts-ignore
    const user = await this.userRepo.findOne(id);
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
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    /*if(data.customer_id){
      const customer =  await this.customerService.findOne(data.customer_id);
      if(customer) {
        newUser.customer = customer
      }
    }*/
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    // @ts-ignore
    const user = await this.userRepo.findOne(id);
    if(!user){
      throw new NotFoundException(`User #${id} not found`);
    }

    this.userRepo.merge(user, changes);

    return this.userRepo.save(user);
  }

  async remove(id: number) {
    // @ts-ignore
    const user = await this.userRepo.findOne(id);
    if(!user){
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepo.delete(id);
  }
}
