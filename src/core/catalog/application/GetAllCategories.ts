import { CategoryRepository } from '../domain/CategoryRepository';
import { Category } from '../domain/Category';

export class GetAllCategories {
  constructor(private repo: CategoryRepository) { }

  async execute(): Promise<Category[]> {
    return this.repo.listAll();
  }
}
