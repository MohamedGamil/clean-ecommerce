import { EntitySchemaColumnOptions } from 'typeorm';

export const BaseEntity = {
  id: {
    type: Number,
    primary: true,
    generated: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    name: 'created_at',
    type: 'timestamp',
    createDate: true,
    nullable: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: 'timestamp',
    updateDate: true,
    nullable: true,
  } as EntitySchemaColumnOptions,
};
