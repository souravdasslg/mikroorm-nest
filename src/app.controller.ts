import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create-mandate')
  createMandate(): Promise<string> {
    return this.appService.createMandate();
  }

  @Get('/get-mandate/:id')
  getMandate(@Param('id') id: string): Promise<Partial<unknown> | null> {
    return this.appService.getMandateWithTxn(id);
  }

  @Post('/create-transaction/:mandateId')
  createTransaction(
    @Param('mandateId') mandateId: string,
    @Body() body: { amount: number },
  ): Promise<Partial<unknown>> {
    return this.appService.createTransactionForMandate(mandateId, body.amount);
  }

  @Get('/find-all-transactions')
  findAllTransactions(): Promise<void> {
    return this.appService.findAllTransactions();
  }
}
