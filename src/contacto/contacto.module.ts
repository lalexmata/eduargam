import { Module } from '@nestjs/common';
import { ContactoController } from './controllers/contacto.controller';
import { ContactoService } from './services/contacto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contacto } from './entities/contacto.entity';
import { ClientsService } from '../users/services/clients.service';
import { Client } from '../users/entities/client.entity';
import { UsersService } from '../users/services/users.service';
import { RolesService } from '../users/services/roles.service';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/entities/role.entity';
import { Category } from '../products/entities/category.entity';
import { CategoriesService } from '../products/services/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contacto, Client, User, Role, Category])],
  controllers: [ContactoController],
  providers: [
    ContactoService,
    ClientsService,
    UsersService,
    RolesService,
    CategoriesService,
  ],
})
export class ContactoModule {}
