import { Product } from './Product';

// ProductRepository: interfaz (puerto) que describe las operaciones que la
// capa de dominio espera de una implementación de repositorio.
export interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
  listAll(): Promise<Product[]>;
}
