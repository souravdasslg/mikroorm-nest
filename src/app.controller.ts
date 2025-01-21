import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EMasterMandateStatusEnum } from 'entities/mandate.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create-mandate')
  createMandate(): Promise<string> {
    return this.appService.createMandate();
  }

  @Get('/get-mandate/:id')
  getMandate(@Param('id') id: string): Promise<Partial<unknown>> {
    return this.appService.getMandate(id);
  }

  @Post('/update-mandate')
  updateMandate(
    @Body() body: { mandateId: string; status: EMasterMandateStatusEnum },
  ) {
    return this.appService.updateMandate(body.mandateId, body.status);
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

  @Post('/update-execution-details/:mandateId')
  updateExecutionDetails(
    @Param('mandateId') mandateId: string,
    @Body() body: { status: string },
  ): Promise<void> {
    return this.appService.updateExecutionDetails(mandateId, body.status);
  }
}
