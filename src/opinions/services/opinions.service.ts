import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opinion } from '../entities/opinion.entity';
import { CreateOpinionDto, UpdateOpinionDto } from '../dtos/opinion.dto';
import {UpdateClientDto} from "../../users/dtos/client.dto";

@Injectable()
export class OpinionsService {
  constructor(
    @InjectRepository(Opinion) private opinionRepo: Repository<Opinion>,
  ) {}

  async findAll() {
    return await this.opinionRepo.find();
  }

  async findOne(id: number) {
    const opinion = await this.opinionRepo.findOne({ where: { id: id } });

    if (!opinion) {
      throw new NotFoundException(`Opinion #${id} not found`);
    }
    return opinion;
  }

  create(data: CreateOpinionDto) {
    const newOpinion = this.opinionRepo.create(data);
    return this.opinionRepo.save(newOpinion);
  }

  async update(id: number, changes: UpdateClientDto) {
    const opinion = await this.findOne(id);

    if (!opinion) {
      throw new NotFoundException(`User #${id} not found`);
    }

    this.opinionRepo.merge(opinion, changes);

    return this.opinionRepo.save(opinion);
  }

  async remove(id: number) {
    const opinion = await this.findOne(id);
    if (!opinion) {
      throw new NotFoundException(`Opinion #${id} not found`);
    }

    const deleteOpinion = await this.opinionRepo.delete(id);

    if (!deleteOpinion) {
      return {
        error: true,
        msj: 'Opinion not deleted',
      };
    }
    return {
      error: false,
      msj: 'Opinion deleted successfull',
    };
  }
}
