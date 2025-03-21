import {
  BigIntType,
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
  Property,
  Ref,
} from '@mikro-orm/core';
import { BaseEntity } from '../common/base.enitity';
import { MandateTxnRepository } from '../repositories/mandateTxn.repository';
import { MandateV2 } from './mandate.entity';

@Entity({
  repository: () => MandateTxnRepository,
  tableName: 'mandate_transactions',
})
export class MandateTransactionsEntity extends BaseEntity {
  [EntityRepositoryType]!: MandateTxnRepository;

  @Property()
  amount!: number;

  @Property()
  status!: string;

  @ManyToOne(() => MandateV2)
  mandate!: Ref<MandateV2>;
}
