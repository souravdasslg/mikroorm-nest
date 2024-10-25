import { Property } from '@mikro-orm/core';

export class BaseEntity {
  @Property({ version: true })
  __v!: number;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date;
}
