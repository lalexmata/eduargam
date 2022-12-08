import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from '../dtos/login-auth.dtos';
import { UsersService } from '../../users/services/users.service';
import { compare } from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(datos: LoginAuthDto) {
    const { email, password } = datos;
    const findUser = await this.userService.findByEmail(email);
    if (!findUser) {
      throw new HttpException('User not found', 400);
    }

    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) throw new HttpException('password incorrect', 403);
    const payload = { id: findUser, name: findUser.name };
    const token = await this.jwtService.sign(payload);
    const data = {
      user: findUser,
      token
    };

    return data;
  }
}
