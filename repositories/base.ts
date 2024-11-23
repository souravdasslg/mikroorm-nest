import {
  EntityDTO,
  EntityRepository,
  FilterQuery,
  FindOneOptions,
  FromEntityType,
  Loaded,
  wrap,
} from '@mikro-orm/postgresql';

export abstract class BaseRepository<
  T extends { id: string },
> extends EntityRepository<T> {
  async findOne<
    Hint extends string = never,
    Fields extends string = '*',
    Excludes extends string = never,
  >(
    where: FilterQuery<T>,
    options?: FindOneOptions<T, Hint, Fields, Excludes>,
  ): Promise<Loaded<T, Hint, Fields, Excludes> | null> {
    return this.em.findOne(this.entityName, where, options);
  }

  async save(entity: T): Promise<void> {
    return this.em.persistAndFlush(entity);
  }

  async updateOne(
    query: FilterQuery<T>,
    entity: Partial<EntityDTO<FromEntityType<Loaded<T, never, '*', never>>>>,
  ): Promise<void> {
    // Find the existing entity first
    const existingEntity = await this.findOneOrFail(query, {
      failHandler: () => new Error(`Entity with id ${query} not found`),
    });

    // Assign the partial updates
    wrap(existingEntity).assign(entity, {
      mergeObjectProperties: true,
    });

    // Persist and flush changes
    await this.em.flush();
  }
}
