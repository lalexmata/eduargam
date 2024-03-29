import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { Client } from '../../users/entities/client.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreateContacto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly rut: string;

  @ApiProperty({
    description: 'Email del cliente',
    required: true,
    example: 'ejemplo@correo.com',
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'numero de contacto' })
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly telephone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({ description: 'nombre de la persona de contacto' })
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly contact: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly city: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly comuna: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly tipo_contacto: string;

  @ApiProperty({ required: true, type: 'varchar' })
  @IsNotEmpty()
  readonly comments: string;

  @ApiProperty({ required: true, type: 'varchar' })
  @IsNotEmpty()
  client?: Client;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  readonly client_id?: number;
}

export class UpdateContacto extends PartialType(CreateContacto){}
