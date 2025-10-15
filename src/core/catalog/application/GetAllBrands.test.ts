import { describe, it, expect, vi } from 'vitest';
import { GetAllBrands } from './GetAllBrands';
import type { Brand } from '../domain/Brand';

describe('GetAllBrands', () => {
  it('should return all brands from repository', async () => {
    const mockBrands: Brand[] = [
      { id: '1', name: 'TechPro' },
      { id: '2', name: 'StyleCo' }
    ];

    const mockRepo = {
      findById: vi.fn(),
      save: vi.fn(),
      listAll: vi.fn().mockResolvedValue(mockBrands),
    };

    const useCase = new GetAllBrands(mockRepo);
    const result = await useCase.execute();

    expect(result).toEqual(mockBrands);
    expect(mockRepo.listAll).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when no brands exist', async () => {
    const mockRepo = {
      findById: vi.fn(),
      save: vi.fn(),
      listAll: vi.fn().mockResolvedValue([]),
    };

    const useCase = new GetAllBrands(mockRepo);
    const result = await useCase.execute();

    expect(result).toEqual([]);
  });
});
