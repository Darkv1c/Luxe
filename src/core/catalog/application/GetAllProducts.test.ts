import { describe, it, expect, vi } from 'vitest';
import { GetAllProducts } from './GetAllProducts';
import type { Product } from '../domain/Product';

describe('GetAllProducts', () => {
  it('should return all products from repository', async () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', priceCents: 1000 },
      { id: '2', name: 'Product 2', priceCents: 2000 }
    ];

    const mockRepo = {
      findById: vi.fn(),
      save: vi.fn(),
      listAll: vi.fn().mockResolvedValue(mockProducts),
    };

    const useCase = new GetAllProducts(mockRepo);
    const result = await useCase.execute();

    expect(result).toEqual(mockProducts);
    expect(mockRepo.listAll).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when no products exist', async () => {
    const mockRepo = {
      findById: vi.fn(),
      save: vi.fn(),
      listAll: vi.fn().mockResolvedValue([]),
    };

    const useCase = new GetAllProducts(mockRepo);
    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it('should handle repository errors', async () => {
    const mockRepo = {
      findById: vi.fn(),
      save: vi.fn(),
      listAll: vi.fn().mockRejectedValue(new Error('Database error')),
    };

    const useCase = new GetAllProducts(mockRepo);

    await expect(useCase.execute()).rejects.toThrow('Database error');
  });
});
