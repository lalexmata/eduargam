import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put, UseGuards,
} from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { CreateClientDto, UpdateClientDto } from '../dtos/client.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/decorators/public.decorators';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('clients')
@ApiTags('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @ApiOperation({ summary: ' Obtener listado de clientes' })
  @Get()
  getAll() {
    return this.clientService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'Obtiene listado de clientes con nombre y logo' })
  @Get('list')
  getClientsList() {
    return this.clientService.list();
  }

  @ApiOperation({ summary: ' Obtener datos de cliente en especifico' })
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear nuevo cliente' })
  @Post()
  create(@Body() payload: CreateClientDto) {
    return this.clientService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateClientDto,
  ) {
    return this.clientService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.remove(+id);
  }
}
