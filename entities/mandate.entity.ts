import {
  BigIntType,
  Embeddable,
  Embedded,
  Entity,
  EntityRepositoryType,
  Enum,
  Index,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
  Ref,
  RequiredEntityData,
} from '@mikro-orm/core';
import { MandateTransactionsEntity } from './mandateTxns.entity';
import { BaseEntity } from 'common/base.enitity';
import { MandateV2Repository } from 'repositories/mandate.repository';
import { PlanV2 } from './plan';

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

@Embeddable()
export class MandateStatusHistory {
  @Property({ type: String })
  status!: EMasterMandateStatusEnum;

  @Property({ type: Date })
  timestamp!: Date;
}
@Embeddable()
export class ExecutionDetails {
  @Property({ nullable: true })
  executionDate!: Date;

  @Property({ nullable: true })
  executionAmount!: number;

  @Property({ nullable: true })
  notificationStatus!: string;
}

@Index({
  properties: ['creationAmount', 'expiresAt'],
  options: { order: { creationAmount: 'asc', expiresAt: 'desc' } },
})
@Entity({ repository: () => MandateV2Repository })
export class MandateV2 extends BaseEntity {
  [EntityRepositoryType]!: MandateV2Repository;
  @PrimaryKey({ type: new BigIntType('string') })
  id!: string;

  @Property()
  creationAmount!: number;

  @Property()
  expiresAt!: Date;

  @OneToOne(() => MandateTransactionsEntity, { nullable: true })
  transaction!: MandateTransactionsEntity | null;

  @Property()
  maxAmount!: number;

  @Property({ type: String })
  pg!: EPaymentGatewayEnum;

  @Property()
  pgMandateId?: string;

  @ManyToOne(() => PlanV2)
  plan!: PlanV2;

  @Property({ type: String })
  status!: EMasterMandateStatusEnum;

  @Embedded(() => MandateStatusHistory)
  statusHistory!: MandateStatusHistory[];

  @Embedded(() => ExecutionDetails, { nullable: true })
  executionDetails!: ExecutionDetails | null;

  @Property()
  user!: string;

  constructor(params: RequiredEntityData<MandateV2>) {
    super();
    Object.assign(this, params);
  }
}
