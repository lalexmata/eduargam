import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { CreateClientDto, UpdateClientDto } from '../dtos/client.dto';
import { UsersService } from './users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    private userService: UsersService,
    @InjectRepository(Client) private clientRepo: Repository<Client>,
  ) {}

  private clients: Client[] = [
    /*{
      id: 1,
      name: 'Condominio Terralta Los Dominicos',
      rut: '53324420-3',
      email: 'S/D',
      telephone: 'S/D',
      address: 'Francisco Bulnes Correa, 3640, Las condes ',
      contact: 'José',
      city: 'Santiago',
      comuna: 'Las Condes',
      user: null,
      logo: '',
    },
    {
      id: 2,
      name: 'Comunidad Edificios Cumbres La Dehesa, Lote 51-A',
      rut: '53325301-6',
      email: 'S/D',
      telephone: 'S/D',
      address: 'Camino La Cumbre 4232',
      contact: 'Mauricio',
      city: 'Santiago',
      comuna: 'Lo Barnechea',
      user: null,
      logo: '',
    },
    {
      id: 3,
      name: 'Condominio Vista Laguna La Dehesa',
      rut: '53324416-5',
      email: 'S/D',
      telephone: 'S/D',
      address: 'Mirador del Valle 15711, Lo Barnechea',
      contact: 'Diedmar',
      city: 'Santiago',
      comuna: 'Lo Barnechea',
      user: null,
      logo: '',
    },
    {
      id: 4,
      name: 'Altos de la Foresta V',
      rut: '53286920-K',
      email: 'S/D',
      telephone: 'S/D',
      address: 'Los Algarrobos 2334, Las Condes',
      contact: 'Iván',
      city: 'Santiago',
      comuna: 'Las Condes',
      user: null,
      logo: '',
    },
  */];

  findAll() {
    return this.clientRepo.find({ relations: { user: true } });
  }

  list() {
    return this.clientRepo
      .createQueryBuilder('client')
      .select(['client.id', 'client.name', 'client.logo'])
      .getMany();
  }

  findOne(id: number) {
    const client = this.clientRepo.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });
    if (!client) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    return client;
  }

  findByRut(rut: string) {
    const client = this.clientRepo.findOne({
      where: { rut: rut },
      relations: {
        user: true,
      },
    });
    if (!client) {
      throw new NotFoundException(`Client #${rut} not found`);
    }
    return client;
  }

  async create(data: CreateClientDto) {
    const newClient = this.clientRepo.create(data);

    if (data.user_id) {
      const user = await this.userService.findOne(data.user_id);
      if (user) {
        newClient.user = user;
      }
    }

    return this.clientRepo.save(newClient);
  }

  async update(id: number, changes: UpdateClientDto) {
    const client = await this.findOne(id);

    if (!client) {
      throw new NotFoundException(`User #${id} not found`);
    }
    if (changes.user_id) {
      const user = await this.userService.findOne(changes.user_id);
      if (user) {
        client.user = user;
      }
    }
    this.clientRepo.merge(client, changes);

    return this.clientRepo.save(client);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`Client #${id} not found`);
    }

    return this.clientRepo.delete(id);
  }
}
