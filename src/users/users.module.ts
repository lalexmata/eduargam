import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Users } from './providers/users';
// @ts-ignore
import { Clients } from './providers/clients';
import { ClientsController } from './controllers/clients.controller';
import { ClientsService } from './services/clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController, ClientsController, RolesController],
  providers: [UsersService, Users, ClientsService, Clients, RolesService],
  exports: [UsersService, RolesService],
})
export class UsersModule {}
