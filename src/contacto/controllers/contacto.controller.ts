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
    //const newContact= this.contactoService.create(data);
    /*const requestCliente: CreateClientDto = {
      name: data.name,
      rut: data.rut,
      email: data.email,
      telephone: data.telephone,
      address: data.address,
      contact: data.contact,
      city: data.city,
      comuna: data.comuna,
      user_id: null,
      logo: 'https://images2.imgbox.com/52/a0/bCmYaEhc_o.png'
    };*/
    //const client = await this.clientService.create(data);

    return this.contactoService.create(data);
  }
}
