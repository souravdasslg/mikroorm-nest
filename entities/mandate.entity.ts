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
  EventArgs,
  EntityName,
  EventSubscriber,
  EntityManager,
} from '@mikro-orm/core';
import { MandateTransactionsEntity } from './mandateTxns.entity';
import { BaseEntity } from '../common/base.enitity';
import { MandateV2Repository } from '../repositories/mandate.repository';
import { PlanV2 } from './plan';
import { Injectable } from '@nestjs/common';

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
@Entity({ repository: () => MandateV2Repository, })
export class MandateV2 extends BaseEntity {
  [EntityRepositoryType]!: MandateV2Repository;

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
  statusHistory: MandateStatusHistory[] = [];

  @Embedded(() => ExecutionDetails, { nullable: true })
  executionDetails!: ExecutionDetails | null;

  @Property()
  user!: string;
}

@Injectable()
export class MandateChangeSubscriber implements EventSubscriber<MandateV2> {
  constructor(em: EntityManager) {
    em.getEventManager().registerSubscriber(this);
  }
  getSubscribedEntities(): EntityName<MandateV2>[] {
    console.log('getSubscribedEntities');
    return [MandateV2];
  }

  async afterCreate(args: EventArgs<MandateV2>): Promise<void> {
    console.log('onBeforeCreate', args);
  }
  async afterDelete(args: EventArgs<MandateV2>): Promise<void> {
    console.log('afterDelete', args);
  }

  async onBeforeUpdate(args: EventArgs<MandateV2>): Promise<void> {
    console.log('onBeforeUpdate', args);
  }

  async beforeUpdate(args: EventArgs<MandateV2>): Promise<void> {
    console.log('onBeforeUpdate', args);
    const changeSets = args.changeSet;

    console.log(changeSets);
  }

  async beforeUpsert(args: EventArgs<MandateV2>): Promise<void> {
    console.log('beforeUpsert', args);
  }
}
