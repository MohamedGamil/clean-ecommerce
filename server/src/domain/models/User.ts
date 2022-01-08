import { Customer } from './Customer';
import { DomainException } from '@domain/exceptions/DomainException';
import { IEntity } from '@domain/shared/IEntity';

export class User implements IEntity {
  id?: number;

  name: string;

  email: string;

  posts?: Customer[];

  createdAt?: Date;

  updatedAt?: Date;

  constructor(name: string, email: string, posts?: Customer[], id?: number) {
    this.name = name;
    this.email = email;
    this.posts = posts;
    this.id = id;
  }

  findPost(postId: number): Customer {
    return this.posts?.find(p => p.id === postId) ?? null;
  }

  findPosts(): Customer[] {
    return this.posts ?? [];
  }

  createPost(post: Customer): void {
    if (!this.posts) this.posts = new Array<Customer>();

    if (this.posts.map(p => p.title).includes(post.title))
      throw new DomainException('Post with the same name already exists');

    this.posts.push(post);
  }

  equals(entity: IEntity) {
    if (!(entity instanceof User)) return false;

    return this.id === entity.id;
  }
}
