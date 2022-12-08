import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/entities/role.entity';
import { UsersService } from '../users/services/users.service';
import { RolesService } from '../users/services/roles.service';
import { JwtModule } from '@nestjs/jwt';
import { enviroments } from '../common/enviroments';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.register({
      secret: enviroments.jwt_secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, RolesService, JwtStrategy],
})
export class AuthModule {}
