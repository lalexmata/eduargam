import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags} from "@nestjs/swagger";
import { CategoriesService } from '../services/categories.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(
    private categoryService: CategoriesService
  ) {
  }
  @Get()
  @ApiOperation({ summary: ' Obtiene todas las categorias registradas' })
  getAll() {
    return this.categoryService.findAll();
  }

  @Get('types/:type')
  getCategoryByType(@Param('type') type: string) {
    return this.categoryService.findByType(type);
  }

  @Get(':id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return `product ${productId} and ${id}`;
  }


  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoryService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

}
