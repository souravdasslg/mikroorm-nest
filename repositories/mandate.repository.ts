import {
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  Loaded,
} from '@mikro-orm/mongodb';
import { MandateV2 } from 'entities/mandate.entity';

export class MandateV2Repository extends EntityRepository<MandateV2> {
  async findOne<
    Hint extends string = never,
    Fields extends string = '*',
    Excludes extends string = never,
  >(
    where: FilterQuery<MandateV2>,
    options?: FindOneOptions<MandateV2, Hint, Fields, Excludes>,
  ): Promise<Loaded<MandateV2, Hint, Fields, Excludes> | null> {
    return this.em.findOne(this.entityName, where, options);
  }
  async save(entity: MandateV2): Promise<void> {
    return this.em.persistAndFlush(entity);
  }
}
