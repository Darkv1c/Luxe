import { ProductRepository } from '../domain/ProductRepository';
import { Product } from '../domain/Product';

export class GetAllProducts {
  constructor(private repo: ProductRepository) { }

  async execute(): Promise<Product[]> {
    return this.repo.listAll();
  }
}
