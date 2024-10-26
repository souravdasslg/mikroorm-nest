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
    const mandate = new MandateV2({
      id: new ObjectId().toString(),
      status: EMasterMandateStatusEnum.PENDING,
      creationAmount: 100,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      maxAmount: 1000,
      pg: EPaymentGatewayEnum.STRIPE,
      pgMandateId: '1234567890',
      planId: '1234567890',
      statusHistory: [],
      user: new ObjectId(),
    });
    await this.mandateRepository.save(mandate);
    return mandate.id;
  }
  async getMandateWithTxn(id: string): Promise<Partial<MandateV2> | null> {
    const mandate = await this.mandateRepository.findOne(
      { id },
      { cache: true, fields: ['statusHistory', 'latestTxn', 'user'] },
    );
    console.log(mandate?.user.toString());
    return mandate;
  }
}
