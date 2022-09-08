import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {MultimediaService} from "../services/multimedia.service";
import {CreateMultimediaDto} from "../dtos/multimedia.dto";

@Controller('multimedia')
@ApiTags('multimedia')
export class MultimediaController {


  constructor(
    private multimedaService: MultimediaService
  ) {
  }

  @ApiOperation({ summary: ' Obtener listado de clientes' })
  @Get()
  getAll() {
    return this.multimedaService.findAll();
  }

  @ApiOperation({ summary: ' Obtener listado de clientes' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.multimedaService.findOne(id);
  }

  @Post()
  create( @Body() data: CreateMultimediaDto){
    return this.multimedaService.create(data);
  }

}
