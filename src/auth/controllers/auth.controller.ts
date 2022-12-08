import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from '../dtos/login-auth.dtos';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() data: any) {
    console.log({ body: data });
  }

  //TODO:login
  @Post('login')
  loginUser(@Body() datos: LoginAuthDto) {
    return this.authService.login(datos);
  }
}
