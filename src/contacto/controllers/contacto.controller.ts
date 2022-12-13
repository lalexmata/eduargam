import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactoService } from '../services/contacto.service';
import { ClientsService } from '../../users/services/clients.service';
import { CreateContacto } from '../dtos/contacto.dtos';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Public } from '../../auth/decorators/public.decorators';

@Controller('contacto')
@ApiTags('contacto')
@UseGuards(JwtAuthGuard)
export class ContactoController {
  constructor(
    private contactoService: ContactoService,
    private clientService: ClientsService,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'Obtiene listado de contactos realizados' })
  getAll() {
    return this.contactoService.findAll();
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Crea un nuevo Post' })
  async create(@Body() data: CreateContacto) {
    return this.contactoService.create(data);
  }
}
