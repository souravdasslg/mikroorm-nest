import { MandateTransactionsEntity } from 'entities/mandateTxns.entity';
import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class MandateTxnRepository extends EntityRepository<MandateTransactionsEntity> {
  constructor(em: EntityManager) {
    super(em, MandateTransactionsEntity);
  }
  async save(entity: MandateTransactionsEntity): Promise<void> {
    await this.em.persistAndFlush(entity);
  }
}
