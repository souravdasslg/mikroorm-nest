import { ObjectId } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import {
  EMasterMandateStatusEnum,
  EPaymentGatewayEnum,
  MandateV2,
} from 'entities/mandate.entity';
import { MandateV2Repository } from 'repositories/mandate.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(MandateV2)
    private readonly mandateRepository: MandateV2Repository,
  ) {}

  async getMandate(id: string): Promise<MandateV2 | null> {
    return this.mandateRepository.findOne({ id });
  }
  async createMandate(): Promise<string> {
    const mandate = new MandateV2();
    mandate.id = new ObjectId().toString();
    mandate.status = EMasterMandateStatusEnum.PENDING;
    mandate.creationAmount = 100;
    mandate.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
    mandate.maxAmount = 1000;
    mandate.pg = EPaymentGatewayEnum.STRIPE;
    mandate.pgMandateId = '1234567890';
    mandate.planId = '1234567890';
    mandate.statusHistory = [];
    await this.mandateRepository.save(mandate);
    return mandate.id;
  }
  async getMandateWithTxn(id: string): Promise<MandateV2 | null> {
    const mandate = await this.mandateRepository.findOne({ id });
    console.log('mandate details', mandate);
    return mandate;
  }
}
