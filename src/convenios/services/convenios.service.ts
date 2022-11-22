import {Body, Delete, Injectable, NotFoundException, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Convenio } from '../entities/convenio.entity';
import { Repository } from 'typeorm';
import {ApiOperation} from "@nestjs/swagger";
import {CreatePostsDto, UpdatePostsDto} from "../../posts/dtos/posts.dtos";
import {CreateConvenio, UpdateConvenio} from "../dtos/convenio.dtos";

@Injectable()
export class ConveniosService {
  constructor(
    @InjectRepository(Convenio) private convenioRepo: Repository<Convenio>,
  ) {
  }

  findAll() {
    return this.convenioRepo.find();
  }

  async findOne(id: number) {
    const convenio = await this.convenioRepo.findOne({ where: { id: id } });

    if (!convenio) {
      throw new NotFoundException(`Convenio #${id} not found`);
    }
    return convenio;
  }

  async create(data: CreateConvenio) {
    const newConvenio = this.convenioRepo.create(data);
    return this.convenioRepo.save(newConvenio);
  }

  async update(id: number, changes: UpdateConvenio) {
    const convenio = await this.findOne(id);

    if(!convenio){
      throw new NotFoundException(`convenio #${id} not found`);
    }

    this.convenioRepo.merge(convenio, changes);

    return this.convenioRepo.save(convenio);

  }

  async remove(id: number) {

    const deleteConvenio = await this.convenioRepo.delete(id);

    if (!deleteConvenio) {
      return {
        error: true,
        msj: 'Post not deleted',
      };
    }

    return {
      error: false,
      msj: 'Convenio deleted successfull',
    };
  }

}
