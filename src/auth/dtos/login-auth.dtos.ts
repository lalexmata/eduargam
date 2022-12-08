import { IsEmail, MaxLength, MinLength} from 'class-validator';
import {PartialType} from "@nestjs/swagger";

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @MinLength(4)
  @MaxLength(12)
  password: string;
}
