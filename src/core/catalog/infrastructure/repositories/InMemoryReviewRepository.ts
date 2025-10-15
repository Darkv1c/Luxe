import { Review } from '../../domain/Review';
import { ReviewRepository } from '../../domain/ReviewRepository';

export class InMemoryReviewRepository implements ReviewRepository {
  private items: Map<string, Review> = new Map();

  constructor(initialData?: Review[]) {
    if (initialData) {
      initialData.forEach(review => this.items.set(review.id, review));
    }
  }

  async findById(id: string): Promise<Review | null> {
    return this.items.get(id) ?? null;
  }

  async findByProductId(productId: string): Promise<Review[]> {
    return Array.from(this.items.values()).filter(
      review => review.productId === productId
    );
  }

  async save(review: Review): Promise<void> {
    this.items.set(review.id, review);
  }

  async listAll(): Promise<Review[]> {
    return Array.from(this.items.values());
  }
}
