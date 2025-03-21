import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { CurrencyEnum, OS, PlatformEnum } from 'common/enums';
import { PlanCountryEnum } from 'common/enums';
import {
  EMasterMandateStatusEnum,
  EPaymentGatewayEnum,
} from 'entities/mandate.entity';
import { MandateV2 } from 'entities/mandate.entity';
import { PlanFrequencyEnum, PlanStatusEnum, PlanV2 } from 'entities/plan';
import { getTsid } from 'tsid-ts';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // will get persisted automatically
    const plan = em.create(PlanV2, {
      country: PlanCountryEnum.IN,
      currency: CurrencyEnum.INR,
      eligibility: {
        os: OS.ANDROID,
        platform: PlatformEnum.APP,
      },
      frequency: PlanFrequencyEnum.MONTHLY,
      localizedDisplayConfig: {
        type: {
          en: 'monthly',
          hin: 'महीनात्मक योजना',
        },
        offerText: {
          en: 'Monthly Plan',
          hin: 'महीनात्मक योजना',
        },
        features: [],
      },
      pricing: {
        display: 100,
        postTrial: 100,
        trial: 100,
      },
      status: PlanStatusEnum.ACTIVE,
      validity: {
        trial: 14,
      },
    });
    await em.persist(plan);

    const mandate = em.create(MandateV2, {
      id: getTsid().toString(),
      creationAmount: 100,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      maxAmount: 100,
      pg: EPaymentGatewayEnum.STRIPE,
      plan: plan.id,
      status: EMasterMandateStatusEnum.ACTIVE,
      statusHistory: [],
      user: 'test',
    });
    await em.persist(mandate);
  }
}
