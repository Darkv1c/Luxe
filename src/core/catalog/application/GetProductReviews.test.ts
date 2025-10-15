import { describe, it, expect, vi } from 'vitest';
import { GetProductReviews } from './GetProductReviews';
import type { Review } from '../domain/Review';

describe('GetProductReviews', () => {
  it('should return reviews for a specific product', async () => {
    const mockReviews: Review[] = [
      {
        id: '1',
        productId: 'prod-1',
        userId: 'user-1',
        userName: 'John',
        rating: 5,
        createdAt: new Date()
      }
    ];

    const mockRepo = {
      findById: vi.fn(),
      findByProductId: vi.fn().mockResolvedValue(mockReviews),
      save: vi.fn(),
      listAll: vi.fn(),
    };

    const useCase = new GetProductReviews(mockRepo);
    const result = await useCase.execute('prod-1');

    expect(result).toEqual(mockReviews);
    expect(mockRepo.findByProductId).toHaveBeenCalledWith('prod-1');
  });

  it('should return empty array when product has no reviews', async () => {
    const mockRepo = {
      findById: vi.fn(),
      findByProductId: vi.fn().mockResolvedValue([]),
      save: vi.fn(),
      listAll: vi.fn(),
    };

    const useCase = new GetProductReviews(mockRepo);
    const result = await useCase.execute('prod-999');

    expect(result).toEqual([]);
  });

  it('should throw error for invalid product ID', async () => {
    const mockRepo = {
      findById: vi.fn(),
      findByProductId: vi.fn(),
      save: vi.fn(),
      listAll: vi.fn(),
    };

    const useCase = new GetProductReviews(mockRepo);

    await expect(useCase.execute('')).rejects.toThrow('Product ID is required');
  });

  it('should trim whitespace from product ID', async () => {
    const mockRepo = {
      findById: vi.fn(),
      findByProductId: vi.fn().mockResolvedValue([]),
      save: vi.fn(),
      listAll: vi.fn(),
    };

    const useCase = new GetProductReviews(mockRepo);
    await useCase.execute('  prod-1  ');

    expect(mockRepo.findByProductId).toHaveBeenCalledWith('prod-1');
  });
});
