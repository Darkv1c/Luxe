import { Product } from '../../domain/Product';
import { ProductRepository } from '../../domain/ProductRepository';

export class InMemoryProductRepository implements ProductRepository {
  private items: Map<string, Product> = new Map();

  async findById(id: string): Promise<Product | null> {
    return this.items.get(id) ?? null;
  }

  async save(product: Product): Promise<void> {
    this.items.set(product.id, product);
  }

  async listAll(): Promise<Product[]> {
    return Array.from(this.items.values());
  }
}
