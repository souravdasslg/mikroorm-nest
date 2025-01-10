import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { CurrencyEnum, OS, PlatformEnum } from 'common/enums';
import { PlanCountryEnum } from 'common/enums';
import { PlanFrequencyEnum, PlanStatusEnum, PlanV2 } from 'entities/plan';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // will get persisted automatically
    const plan = em.create(PlanV2, {
      id: BigInt(1234567890),
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
  }
}
