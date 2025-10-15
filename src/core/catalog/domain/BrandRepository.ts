import { Brand } from './Brand';

// BrandRepository: interface (port) that describes the operations that the
// domain layer expects from a brand repository implementation.
export interface BrandRepository {
  findById(id: string): Promise<Brand | null>;
  save(brand: Brand): Promise<void>;
  listAll(): Promise<Brand[]>;
}
