import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateMultimediaDto {
  @ApiProperty({ description: 'url del archivo multimedia' })
  @IsUrl()
  uri: string;

  @ApiProperty({ description: 'extension del archivo multimedia' })
  @IsString()
  extension: string;
}

export class UpdateMultimediaDto extends PartialType(CreateMultimediaDto) {}
