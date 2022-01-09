import { Test } from '@nestjs/testing';
import { ProductsController } from '@presentation/controllers/ProductsController';
import { ProductsUseCases } from '@application/use-cases/ProductsUseCases';
import { Product } from '@domain/models/Product';
import { ProductVM } from '@presentation/view-models/products/ProductVM';

describe('ProductsController Test', () => {
  let productsController: ProductsController;
  let productsUseCases: ProductsUseCases;

  const POST = new Product('Title', 'Text', null, 1);
  POST.createdAt = new Date('2020-05-31 02:20:58.037572-03');
  POST.updatedAt = new Date('2020-05-31 02:20:58.037572-03');

  const POST_VM = {
    id: 1,
    title: 'Title',
    text: 'Text',
    createdAt: new Date('2020-05-31 02:20:58.037572-03'),
    updatedAt: new Date('2020-05-31 02:20:58.037572-03'),
  } as ProductVM;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductsController,
        {
          provide: ProductsUseCases,
          useFactory: () => ({
            getAllProductsByUser: jest.fn(() => true),
            getProductByUser: jest.fn(() => true),
            createProduct: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    productsUseCases = module.get<ProductsUseCases>(ProductsUseCases);
    productsController = module.get<ProductsController>(ProductsController);
  });

  it('should return a list of ProductVM when get a valid user with products in GET /users/:userId/products', async () => {
    jest
      .spyOn(productsUseCases, 'getAllProductsByUser')
      .mockImplementation(async () => [POST]);

    const productsVM = await productsController.getProductsByUser('1');

    expect(productsVM).toHaveLength(1);
    expect(productsVM).toEqual([POST_VM]);
  });

  it('should return the ProductVM when get a valid products of a valid user in GET /users/:userId/products/:postId', async () => {
    jest
      .spyOn(productsUseCases, 'getProductByUser')
      .mockImplementation(async () => POST);

    const postVM = await productsController.getProduct('1', '1');

    expect(postVM instanceof ProductVM).toBeTruthy();
    expect(postVM).toEqual(POST_VM);
  });

  it('should return a ProductVM when creating a post in POST /users/:userId/products', async () => {
    jest
      .spyOn(productsUseCases, 'createProduct')
      .mockImplementation(async () => POST);

    const postVM = await productsController.createProduct('1', POST);

    expect(postVM instanceof ProductVM).toBeTruthy();
    expect(postVM).toEqual(POST_VM);
  });
});
