import { MandateTransactionsEntity } from 'entities/mandateTxns.entity';
import { BaseRepository } from './base';

export class MandateTxnRepository extends BaseRepository<MandateTransactionsEntity> {
  async save(entity: MandateTransactionsEntity): Promise<void> {
    return this.em.persistAndFlush(entity);
  }
}
