import { OptionalProps, Property } from '@mikro-orm/core';

export class BaseEntity {
  [OptionalProps]?: '__v' | 'createdAt' | 'updatedAt';
  @Property({ default: 0 })
  __v!: number;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date;
}
