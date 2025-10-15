import { Review } from './Review';

// ReviewRepository: interface (port) that describes the operations that the
// domain layer expects from a review repository implementation.
export interface ReviewRepository {
  findById(id: string): Promise<Review | null>;
  findByProductId(productId: string): Promise<Review[]>;
  save(review: Review): Promise<void>;
  listAll(): Promise<Review[]>;
}
