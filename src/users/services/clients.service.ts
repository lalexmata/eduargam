import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from '../entities/client.entity';
import { CreateClientDto, UpdateClientDto } from '../dtos/client.dto';

@Injectable()
export class ClientsService {

  private counterId = 1;
  private clients: Client[] = [
    {
      id: 1,
      name: 'Condominio Terralta Los Dominicos',
      rut: '53324420-3',
      email: 'S/D',
      telephone: 'S/D',
      address: 'Francisco Bulnes Correa, 3640, Las condes ',
      contact: 'José',
      city: 'Santiago',
      comuna: 'Las Condes',
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
    },
  ];

  findAll() {
    return this.clients;
  }

  findOne(id: number) {
    const user = this.clients.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    return user;
  }

  create(data: CreateClientDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.clients.push(newUser);
    return newUser;
  }

  update(id: number, changes: UpdateClientDto) {
    const client = this.findOne(id);
    const index = this.clients.findIndex((item) => item.id === id);
    this.clients[index] = {
      ...client,
      ...changes,
    };
    return this.clients[index];
  }

  remove(id: number) {
    const index = this.clients.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Client #${id} not found`);
    }
    this.clients.splice(index, 1);
    return true;
  }

}
