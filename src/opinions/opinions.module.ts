import { Module } from '@nestjs/common';
import { OpinionsController } from './controllers/opinions.controller';
import { OpinionsService } from './services/opinions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opinion } from './entities/opinion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Opinion])],
  controllers: [OpinionsController],
  providers: [OpinionsService],
})
export class OpinionsModule {}
