import { EntitySchema } from 'typeorm';
import { User } from '@domain/models/User';
import { Post } from '@domain/models/Post';
import { BaseEntity } from './BaseEntity';

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    ...BaseEntity,
    name: {
      type: String,
      length: 100,
      nullable: true,
    },
    email: {
      type: String,
      length: 100,
      nullable: true,
    },
    password: {
      type: String,
      length: 191,
      nullable: true,
    },
    isAdmin: {
      name: 'is_admin',
      type: 'boolean',
      default: false,
      nullable: true,
    },
  },
  orderBy: {
    createdAt: 'ASC',
  },
  relations: {
    posts: {
      type: 'one-to-many',
      target: () => Post,
      cascade: ['insert', 'update'],
      onDelete: 'CASCADE',
      inverseSide: 'user',
    },
  },
  indices: [
    {
      name: 'IDX_USERS',
      unique: true,
      columns: ['name', 'email'],
    },
  ],
  uniques: [
    {
      name: 'UNIQUE_USERS',
      columns: ['email'],
    },
  ],
});
