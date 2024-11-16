import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { BaseEntity } from 'common/base.enitity';
import { MandateTxnRepository } from 'repositories/mandateTxn.repository';

@Entity({
  repository: () => MandateTxnRepository,
  tableName: 'mandate_transactions',
})
export class MandateTransactionsEntity extends BaseEntity {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  amount!: number;

  @Property()
  status!: string;

  // @ManyToOne(() => MandateV2)
  // mandate!: MandateV2; // Reference back to MandateV2
}
