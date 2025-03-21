import {
  BigIntType,
  Embeddable,
  Embedded,
  Entity,
  EntityRepositoryType,
  Enum,
  JsonProperty,
  JsonType,
  Platform,
  PrimaryKey,
  Property,
  Collection,
  OneToMany,
} from '@mikro-orm/mongodb';

import { BaseEntity } from '../common/base.enitity';
import {
  CurrencyEnum,
  Lang,
  OS,
  PlanCountryEnum,
  PlatformEnum,
} from '../common/enums';
import { PlanV2Repository } from '../repositories/plan.repository';
import { MandateV2 } from './mandate.entity';

export enum PlanStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum PlanFrequencyEnum {
  ANNUAL = 365,
  BIWEEKLY = 14,
  HALF_YEARLY = 182,
  MONTHLY = 30,
  QUARTERLY = 90,
  TRIAL = 7,
  WEEKLY = 7,
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
  @Enum(() => OS)
  os!: OS;

  @Enum(() => PlatformEnum)
  platform!: PlatformEnum;
}

@Embeddable()
export class PlanValidity {
  @Property()
  trial!: number;
}

@Entity({ repository: () => PlanV2Repository })
export class PlanV2 extends BaseEntity {

  [EntityRepositoryType]!: PlanV2Repository;

  @Enum(() => PlanCountryEnum)
  country!: PlanCountryEnum;

  @Enum(() => CurrencyEnum)
  currency!: CurrencyEnum;

  @Property()
  derivedFrom?: string; // FIXME: Once we move all the plans to v2, we can remove this. This is mostly for to client side compatibility

  @Embedded(() => Eligibility)
  eligibility!: Eligibility;

  @Enum(() => PlanFrequencyEnum)
  frequency!: PlanFrequencyEnum;

  @Property({ type: JsonType })
  localizedDisplayConfig!: PlanLocalizedDisplayConfig;

  @Embedded(() => Pricing)
  pricing!: Pricing;

  @Enum(() => PlanStatusEnum)
  status!: PlanStatusEnum;

  @Embedded(() => PlanValidity)
  validity!: PlanValidity;
}
