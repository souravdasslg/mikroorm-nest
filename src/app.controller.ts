import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MandateV2 } from 'entities/mandate.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create-mandate')
  createMandate(): Promise<string> {
    return this.appService.createMandate();
  }

  @Get('/get-mandate/:id')
  getMandateWithTxn(@Param('id') id: string): Promise<MandateV2 | null> {
    return this.appService.getMandateWithTxn(id);
  }
}
