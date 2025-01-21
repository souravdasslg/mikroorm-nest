import { PlanV2 } from 'entities/plan';
import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class PlanV2Repository extends EntityRepository<PlanV2> {
  constructor(em: EntityManager) {
    super(em, PlanV2);
  }
  async save(plan: PlanV2): Promise<void> {
    await this.em.persistAndFlush(plan);
  }
}
