import { OptionalProps, Property } from '@mikro-orm/core';

export class BaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date;
}
