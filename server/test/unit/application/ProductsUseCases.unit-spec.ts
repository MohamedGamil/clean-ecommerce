import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { IUsersRepository } from '@application/ports/IUsersRepository';
import { ProductsUseCases } from '@application/use-cases/ProductsUseCases';
import { User } from '@domain/models/User';
import { Product } from '@domain/models/Product';

describe('ProductsUseCases Test', () => {
  let usersRepository: IUsersRepository;
  let productsUseCases: ProductsUseCases;

  const PRODUCT = new Product({ name: 'Text1', desc: 'Description1', id: 1 });
  const PRODUCT2 = new Product({ name: 'Text2', desc: 'Description2', id: 2 });
  const USER = new User('John Doe', 'john.doe@gmail.com', [], [PRODUCT], 1);
  const USER2 = new User('John Doe', 'john.doe@gmail.com', [], [PRODUCT, PRODUCT2], 1);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductsUseCases,
        {
          provide: IUsersRepository,
          useFactory: () => ({
            save: jest.fn(() => true),
            findOne: jest.fn(() => true),
            find: jest.fn(() => true),
            update: jest.fn(() => true),
            delete: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    usersRepository = module.get<IUsersRepository>(IUsersRepository);
    productsUseCases = module.get<ProductsUseCases>(ProductsUseCases);
  });

  it('shoud return a list of products when the users have the products in  getAllProductsByUser', async () => {
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => USER);
    const products = await productsUseCases.getAllProductsByUser(1);

    expect(products).toHaveLength(1);
    expect(products).toStrictEqual([PRODUCT]);
  });

  it('shoud return a empty list when user has no post in getAllProductsByUser', async () => {
    const user = new User('', '', null, 1);
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => user);

    const products = await productsUseCases.getAllProductsByUser(1);

    expect(products).toHaveLength(0);
    expect(products).toStrictEqual([]);
  });

  it('shoud throw NotFoundException when the user is not found in getAllProductsByUser', async () => {
    try {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);
      await productsUseCases.getAllProductsByUser(2);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The user {2} wasn't found.");
    }
  });

  it('shoud get a post when a valid user has a post in getProductByUser', async () => {
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => USER);

    const post = await productsUseCases.getProductByUser(1, 1);

    expect(post instanceof Product).toBeTruthy();
    expect(post).toStrictEqual(PRODUCT);
  });

  it('shoud throw NotFoundException when not user is found in getProductByUser', async () => {
    try {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);
      await productsUseCases.getProductByUser(2, 1);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The user {2} wasn't found.");
    }
  });

  it('shoud throw NotFoundException when user there are not post in getProductByUser', async () => {
    try {
      const user = new User('', '', null, 1);
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => user);
      await productsUseCases.getProductByUser(1, 1);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The post {1} wasn't found.");
    }
  });

  it('shoud throw NotFoundException when the post not exists in getProductByUser', async () => {
    try {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => USER);
      await productsUseCases.getProductByUser(1, 99);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The post {99} wasn't found.");
    }
  });

  it('should create a post when user and post is valis in createProduct', async () => {
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => USER);
    jest.spyOn(usersRepository, 'save').mockImplementation(async () => USER2);

    const post = await productsUseCases.createProduct(1, PRODUCT2);

    expect(post instanceof Product).toBeTruthy();
    expect(post).toStrictEqual(PRODUCT2);
  });

  it('should throw NotFoundException when the user not exists in createProduct', async () => {
    try {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);
      await productsUseCases.createProduct(2, PRODUCT2);
    } catch (err) {
      expect(err instanceof NotFoundException).toBeTruthy();
      expect(err.message).toBe("The user {2} wasn't found.");
    }
  });
});
