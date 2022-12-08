import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConveniosService } from '../services/convenios.service';
import { CreateConvenio, UpdateConvenio } from '../dtos/convenio.dtos';

@Controller('convenios')
@ApiTags('convenios')
export class ConveniosController {
  constructor(private convenioService: ConveniosService) {}

  @Get('')
  @ApiOperation({ summary: 'Obtiene listado de convenios' })
  getAll() {
    return this.convenioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un Convenio por su id' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.convenioService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo Post' })
  create(@Body() payload: CreateConvenio) {
    return this.convenioService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edita un Convenio existente por su id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateConvenio,
  ) {
    return this.convenioService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un Post existente por su id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.convenioService.remove(+id);
  }
}
