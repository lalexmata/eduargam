import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Users } from './providers/users';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Users]
})
export class UsersModule {}
