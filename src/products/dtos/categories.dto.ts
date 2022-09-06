import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}