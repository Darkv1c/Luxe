import { describe, it, expect, vi } from 'vitest';
import { GetAllCategories } from './GetAllCategories';
import type { Category } from '../domain/Category';

describe('GetAllCategories', () => {
  it('should return all categories from repository', async () => {
    const mockCategories: Category[] = [
      { id: '1', name: 'Electronics' },
      { id: '2', name: 'Fashion' }
    ];

    const mockRepo = {
      findById: vi.fn(),
      save: vi.fn(),
      listAll: vi.fn().mockResolvedValue(mockCategories),
    };

    const useCase = new GetAllCategories(mockRepo);
    const result = await useCase.execute();

    expect(result).toEqual(mockCategories);
    expect(mockRepo.listAll).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when no categories exist', async () => {
    const mockRepo = {
      findById: vi.fn(),
      save: vi.fn(),
      listAll: vi.fn().mockResolvedValue([]),
    };

    const useCase = new GetAllCategories(mockRepo);
    const result = await useCase.execute();

    expect(result).toEqual([]);
  });
});
