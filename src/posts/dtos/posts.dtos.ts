import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class CreatePostsDto {
  @ApiProperty({ description: 'Título del post', required: true })
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsOptional()
  readonly categories_id: number[];

  @ApiProperty()
  readonly description: string;

  @ApiProperty({ description: 'estado del post 1 activo 0 inactivo' })
  readonly status: number;
}

export class UpdatePostsDto extends PartialType(CreatePostsDto) {}
