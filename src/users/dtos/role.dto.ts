import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import {ApiProperty, OmitType, PartialType} from "@nestjs/swagger";


export class CreateRoleDto {


  @ApiProperty({ description: "Nombre del rol", required: true, example: "Admin"})
  @IsString()
  @IsNotEmpty()
  @Length(4)
  readonly name: string;

}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
