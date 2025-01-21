import { MandateV2 } from 'entities/mandate.entity';
import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class MandateV2Repository extends EntityRepository<MandateV2> {
  constructor(em: EntityManager) {
    super(em, MandateV2);
  }

  async save(mandate: MandateV2): Promise<void> {
    await this.em.persistAndFlush(mandate);
  }
}
