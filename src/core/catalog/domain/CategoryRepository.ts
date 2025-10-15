import { Category } from './Category';

// CategoryRepository: interface (port) that describes the operations that the
// domain layer expects from a category repository implementation.
export interface CategoryRepository {
  findById(id: string): Promise<Category | null>;
  save(category: Category): Promise<void>;
  listAll(): Promise<Category[]>;
}
