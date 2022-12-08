import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactoService } from '../services/contacto.service';
import { CreateConvenio } from '../../convenios/dtos/convenio.dtos';
import { ClientsService } from '../../users/services/clients.service';
import { CreateClientDto } from '../../users/dtos/client.dto';
import { CreateContacto } from '../dtos/contacto.dtos';

@Controller('contacto')
@ApiTags('contacto')
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
