import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OpinionsService } from '../services/opinions.service';
import { CreateOpinionDto, UpdateOpinionDto } from '../dtos/opinion.dto';

@Controller('opinions')
@ApiTags('opinions')
export class OpinionsController {
  constructor(private opinionService: OpinionsService) {}

  @Get()
  findAll() {
    return this.opinionService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.opinionService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOpinionDto) {
    return this.opinionService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOpinionDto,
  ) {
    return this.opinionService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.opinionService.remove(+id);
  }
}
