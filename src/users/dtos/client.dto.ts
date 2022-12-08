import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
} from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateClientDto {
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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  readonly user_id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly logo: string;
}

export class UpdateClientDto extends PartialType(
  OmitType(CreateClientDto, ['rut']),
) {}
