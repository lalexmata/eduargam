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

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, ClientsController],
  providers: [UsersService, Users, ClientsService, Clients],
  exports: [UsersService],
})
export class UsersModule {}
