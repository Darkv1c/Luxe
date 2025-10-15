import { Brand } from '../../domain/Brand';
import { BrandRepository } from '../../domain/BrandRepository';

export class InMemoryBrandRepository implements BrandRepository {
  private items: Map<string, Brand> = new Map();

  constructor(initialData?: Brand[]) {
    if (initialData) {
      initialData.forEach(brand => this.items.set(brand.id, brand));
    }
  }

  async findById(id: string): Promise<Brand | null> {
    return this.items.get(id) ?? null;
  }

  async save(brand: Brand): Promise<void> {
    this.items.set(brand.id, brand);
  }

  async listAll(): Promise<Brand[]> {
    return Array.from(this.items.values());
  }
}
