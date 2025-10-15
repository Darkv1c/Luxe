import { Category } from '../../domain/Category';
import { CategoryRepository } from '../../domain/CategoryRepository';

export class InMemoryCategoryRepository implements CategoryRepository {
  private items: Map<string, Category> = new Map();

  constructor(initialData?: Category[]) {
    if (initialData) {
      initialData.forEach(category => this.items.set(category.id, category));
    }
  }

  async findById(id: string): Promise<Category | null> {
    return this.items.get(id) ?? null;
  }

  async save(category: Category): Promise<void> {
    this.items.set(category.id, category);
  }

  async listAll(): Promise<Category[]> {
    return Array.from(this.items.values());
  }
}
