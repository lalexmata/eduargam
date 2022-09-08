import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      app_name: 'Eduargam',
      version: '0.0.1',
      author: 'lmatadesign'
    };
  }


}
