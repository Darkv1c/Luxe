import { ProductRepository } from '../domain/ProductRepository';
import { Product } from '../domain/Product';

export class GetProduct {
  constructor(private repo: ProductRepository) { }

  async execute(id: string): Promise<Product | null> {
    // Validate input
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new Error('Product ID is required');
    }

    // Trim whitespace from ID
    const trimmedId = id.trim();

    return this.repo.findById(trimmedId);
  }
}
