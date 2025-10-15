import { ReviewRepository } from '../domain/ReviewRepository';
import { Review } from '../domain/Review';

export class GetProductReviews {
  constructor(private repo: ReviewRepository) { }

  async execute(productId: string): Promise<Review[]> {
    if (!productId || typeof productId !== 'string' || productId.trim() === '') {
      throw new Error('Product ID is required');
    }

    const trimmedId = productId.trim();
    return this.repo.findByProductId(trimmedId);
  }
}
