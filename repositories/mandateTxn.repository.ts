import { MandateTransactionsEntity } from 'entities/mandateTxns.entity';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class MandateTxnRepository extends EntityRepository<MandateTransactionsEntity> {
  async save(entity: MandateTransactionsEntity): Promise<void> {
    return this.em.persistAndFlush(entity);
  }
}
