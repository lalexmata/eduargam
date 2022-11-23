import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from '../../users/dtos/client.dto';
import { ClientsService } from '../../users/services/clients.service';
import {Contacto} from "../entities/contacto.entity";
import {CreateContacto} from "../dtos/contacto.dtos";
import {CategoriesService} from "../../products/services/categories.service";


@Injectable()
export class ContactoService {
  constructor(
    @InjectRepository(Contacto) private contactoRepo : Repository<Contacto>,
    private clientService: ClientsService,
    private categoryService: CategoriesService,
  ) {}

  findAll() {
    return this.contactoRepo.find({
      relations: {
        category: true,
        client: true,
      },
    });
  }

  async create(data: CreateContacto) {
    const client = await this.buscaCliente(data);

    const newContact = this.contactoRepo.create({
      client: client,
      comments: data.comments,
      tipo_contacto: data.tipo_contacto,
    });

    if (data.category_id) {
      const category = await this.categoryService.findOne(data.category_id);
      if (!category) {
        throw new NotFoundException(`Category #${data.category_id} not found`);
      }
      newContact.category = category;
    }

    return this.contactoRepo.save(newContact);
  }

  async buscaCliente(data) {
    const datosCliente = this.armarRequestCliente(data);
    let client = await this.clientService.findByRut(data.rut);

    if (!client) {
      client = await this.clientService.create(datosCliente);
    }

    return client;
  }

  private armarRequestCliente(data) {
    const requestCliente: CreateClientDto = {
      name: data.name,
      rut: data.rut,
      email: data.email,
      telephone: data.telephone,
      address: data.address,
      contact: data.contact,
      city: data.city,
      comuna: data.comuna,
      user_id: null,
      logo: 'https://images2.imgbox.com/52/a0/bCmYaEhc_o.png',
    };
    return requestCliente;
  }
}
