import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import {ApiProperty, OmitType, PartialType} from "@nestjs/swagger";


export class CreateUserDto {

  @ApiProperty({ description: "Email del usuario", required: true, example: "ejemplo@correo.com"})
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly role_id: number;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'])
) {}
