import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Multimedia} from "../entities/multimedia.entity";
import {Repository} from "typeorm";
import {CreateMultimediaDto, UpdateMultimediaDto} from "../dtos/multimedia.dto";
import {UpdateRoleDto} from "../../users/dtos/role.dto";

@Injectable()
export class MultimediaService {
  constructor(
    @InjectRepository(Multimedia) private multimediaRepo: Repository<Multimedia>,
  ) {
  }

  findAll() {
    return this.multimediaRepo.find();
  }

  findOne(id: number) {
    const multimedia = this.multimediaRepo.find({
      where: { id: id},
    });

    if (!multimedia) {
      throw new NotFoundException(`Multimedia #${id} not found`);
    }

    return multimedia;
  }

  create(data: CreateMultimediaDto) {
    const newMultimedia = this.multimediaRepo.create(data);

    return this.multimediaRepo.save(newMultimedia);
  }

  async remove(id: number) {
    const multimedia = await this.findOne(id);
    if (!multimedia) {
      throw new NotFoundException(`multimedia #${id} not found`);
    }

    return this.multimediaRepo.delete(id);
  }
}
