import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetProduct } from './GetProduct';
import type { ProductRepository } from '../domain/ProductRepository';
import type { Product } from '../domain/Product';

describe('GetProduct', () => {
    let mockRepo: ProductRepository;
    let useCase: GetProduct;

    beforeEach(() => {
        mockRepo = {
            findById: vi.fn(),
            save: vi.fn(),
            listAll: vi.fn(),
        };
        useCase = new GetProduct(mockRepo);
    });

    describe('Happy Path', () => {
        it('should return product when found', async () => {
            const mockProduct: Product = {
                id: '1',
                name: 'Test Product',
                priceCents: 9999,
            };

            vi.mocked(mockRepo.findById).mockResolvedValue(mockProduct);

            const result = await useCase.execute('1');

            expect(result).toEqual(mockProduct);
            expect(mockRepo.findById).toHaveBeenCalledWith('1');
            expect(mockRepo.findById).toHaveBeenCalledTimes(1);
        });

        it('should call repository with correct id', async () => {
            const productId = 'abc-123';
            vi.mocked(mockRepo.findById).mockResolvedValue(null);

            await useCase.execute(productId);

            expect(mockRepo.findById).toHaveBeenCalledWith(productId);
        });
    });

    describe('Not Found Cases', () => {
        it('should return null when product not found', async () => {
            vi.mocked(mockRepo.findById).mockResolvedValue(null);

            const result = await useCase.execute('non-existent-id');

            expect(result).toBeNull();
            expect(mockRepo.findById).toHaveBeenCalledWith('non-existent-id');
        });

        it('should return null for different product ids', async () => {
            vi.mocked(mockRepo.findById).mockResolvedValue(null);

            const result1 = await useCase.execute('999');
            const result2 = await useCase.execute('xyz');

            expect(result1).toBeNull();
            expect(result2).toBeNull();
        });
    });

    describe('Error Handling', () => {
        it('should throw error when id is empty string', async () => {
            await expect(useCase.execute('')).rejects.toThrow('Product ID is required');
            expect(mockRepo.findById).not.toHaveBeenCalled();
        });

        it('should throw error when id is whitespace only', async () => {
            await expect(useCase.execute('   ')).rejects.toThrow('Product ID is required');
            expect(mockRepo.findById).not.toHaveBeenCalled();
        });

        it('should throw error when id is null', async () => {
            await expect(useCase.execute(null as unknown as string)).rejects.toThrow('Product ID is required');
            expect(mockRepo.findById).not.toHaveBeenCalled();
        });

        it('should throw error when id is undefined', async () => {
            await expect(useCase.execute(undefined as unknown as string)).rejects.toThrow('Product ID is required');
            expect(mockRepo.findById).not.toHaveBeenCalled();
        });

        it('should propagate repository errors', async () => {
            const repoError = new Error('Database connection failed');
            vi.mocked(mockRepo.findById).mockRejectedValue(repoError);

            await expect(useCase.execute('1')).rejects.toThrow('Database connection failed');
        });
    });

    describe('Edge Cases', () => {
        it('should handle very long product ids', async () => {
            const longId = 'a'.repeat(1000);
            vi.mocked(mockRepo.findById).mockResolvedValue(null);

            await useCase.execute(longId);

            expect(mockRepo.findById).toHaveBeenCalledWith(longId);
        });

        it('should handle special characters in product id', async () => {
            const specialId = 'product-#123-@special!';
            const mockProduct: Product = {
                id: specialId,
                name: 'Special Product',
                priceCents: 5000,
            };

            vi.mocked(mockRepo.findById).mockResolvedValue(mockProduct);

            const result = await useCase.execute(specialId);

            expect(result).toEqual(mockProduct);
        });

        it('should trim whitespace from product id', async () => {
            const idWithSpaces = '  product-123  ';
            const trimmedId = 'product-123';

            vi.mocked(mockRepo.findById).mockResolvedValue(null);

            await useCase.execute(idWithSpaces);

            expect(mockRepo.findById).toHaveBeenCalledWith(trimmedId);
        });
    });
});
