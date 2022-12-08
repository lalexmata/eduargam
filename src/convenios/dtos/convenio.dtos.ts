import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateConvenio {
  @ApiProperty({ description: 'nombre de la empresa convenio', required: true })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'imagen del convenio', required: true })
  @IsUrl()
  readonly image: string;
}

export class UpdateConvenio extends PartialType(CreateConvenio) {}
