import { EntityRepository } from '@mikro-orm/core';
import { MandateTransactionsEntity } from 'entities/mandateTxns.entity';

export class MandateTxnRepository extends EntityRepository<MandateTransactionsEntity> {
  async save(entity: MandateTransactionsEntity): Promise<void> {
    return this.em.persistAndFlush(entity);
  }
}
