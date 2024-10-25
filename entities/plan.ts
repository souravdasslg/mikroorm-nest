import {
  Embeddable,
  Embedded,
  Entity,
  Platform,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { BaseEntity } from 'common/base.enitity';
import { CurrencyEnum, Lang, OS, PlanCountryEnum } from 'common/enums';

export enum PlanStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum PlanFrequencyEnum {
  ANNUAL = 'annual',
  BIWEEKLY = 'biweekly',
  HALF_YEARLY = 'half_yearly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  TRIAL = 'trial',
  WEEKLY = 'weekly',
}

@Embeddable()
export class LanguageVariantText {
  @Property()
  [Lang.EN]!: string;

  @Property()
  [Lang.HIN]!: string;
}

@Embeddable()
export class PlanLocalizedDisplayConfig {
  @Property()
  features!: LanguageVariantText[];

  @Property()
  offerText!: LanguageVariantText;

  @Property()
  type!: LanguageVariantText;
}

@Embeddable()
export class Pricing {
  @Property()
  display!: number; // Only to display user, not to calculate

  @Property()
  postTrial!: number;

  @Property()
  trial!: number;
}

@Embeddable()
export class Eligibility {
  @Property()
  os!: OS[];

  @Property()
  platform!: Platform[];
}

@Embeddable()
export class PlanValidity {
  @Property()
  trial!: number;
}

@Entity()
export class PlanV2 extends BaseEntity {
  @PrimaryKey()
  _id!: ObjectId;

  @Property()
  country!: PlanCountryEnum;

  @Property()
  currency!: CurrencyEnum;

  @Property()
  derivedFrom?: string; // FIXME: Once we move all the plans to v2, we can remove this. This is mostly for to client side compatibility

  @Embedded(() => Eligibility)
  eligibility!: Eligibility;

  @Property()
  frequency!: PlanFrequencyEnum;

  @Embedded(() => PlanLocalizedDisplayConfig)
  localizedDisplayConfig!: PlanLocalizedDisplayConfig;

  @Embedded(() => Pricing)
  pricing!: Pricing;

  @Property()
  status!: PlanStatusEnum;

  @Embedded(() => PlanValidity)
  validity!: PlanValidity;
}
