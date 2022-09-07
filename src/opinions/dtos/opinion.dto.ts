import {ApiProperty, PartialType} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsPositive, IsString} from "class-validator";

export class CreateOpinionDto {

  @ApiProperty({ description: "Nombre de quien emite la opinion", required: true, example: "ejemplo@correo.com"})
  @IsString()
  name: string;

  @ApiProperty({ description: 'Nombre del cliente', required: true })
  @IsString()
  client_name: string;

  @ApiProperty({ description: 'Nombre del cliente', required: true })
  @IsString()
  opinion: string;

  @ApiProperty({ description: 'Nombre del cliente', required: true })
  @IsPositive()
  @IsNotEmpty()
  rate: number;

  @ApiProperty({ description: 'Estado de la opinion 1 es activo 0 inactivo', required: false, default: 0 })
  @IsOptional()
  status: number

}

export class UpdateOpinionDto extends PartialType(CreateOpinionDto){}
