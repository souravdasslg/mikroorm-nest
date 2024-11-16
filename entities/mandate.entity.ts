import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  RequiredEntityData,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { MandateTransactionsEntity } from './mandateTxns.entity';
import { BaseEntity } from 'common/base.enitity';
import { MandateV2Repository } from 'repositories/mandate.repository';

export enum EMasterMandateStatusEnum {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}
export enum EPaymentGatewayEnum {
  STRIPE = 'STRIPE',
}

@Entity()
export class MandateStatusHistory {
  @Property({ type: String })
  status!: EMasterMandateStatusEnum;

  @Property({ type: Date })
  timestamp!: Date;
}

export class ExecutionDetails {
  @Property()
  executionDate!: Date;

  @Property()
  executionAmount!: number;
}

@Entity({ repository: () => MandateV2Repository })
export class MandateV2 extends BaseEntity {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  creationAmount!: number;

  @Property()
  expiresAt!: Date;

  @OneToOne(() => MandateTransactionsEntity, { nullable: true })
  transaction!: MandateTransactionsEntity | null;

  @Property()
  maxAmount!: number;

  @Enum(() => EPaymentGatewayEnum)
  pg!: EPaymentGatewayEnum;

  @Property()
  pgMandateId?: string;

  @Property()
  planId!: string;

  @Enum(() => EMasterMandateStatusEnum)
  status!: EMasterMandateStatusEnum;

  @Property()
  statusHistory!: MandateStatusHistory[];

  @Property()
  user!: ObjectId;

  constructor(params: RequiredEntityData<MandateV2>) {
    super();
    Object.assign(this, params);
  }
}
