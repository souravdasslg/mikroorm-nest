import { OptionalProps, Property, SerializedPrimaryKey, PrimaryKey } from '@mikro-orm/core';
import { ObjectId } from 'mongodb';

export type DefaultOptionalProps = 'createdAt' | 'updatedAt' | 'id';

export class BaseEntity {

  @PrimaryKey()
  _id: ObjectId = new ObjectId();

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @SerializedPrimaryKey()
  id!: string;

  [OptionalProps]?: DefaultOptionalProps;

  @Property({
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  updatedAt!: Date;
}


