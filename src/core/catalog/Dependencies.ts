import { ApiProductRepository } from './infrastructure/repositories/ApiProductRepository';
import { InMemoryProductRepository } from './infrastructure/repositories/InMemoryProductRepository';
import { CatalogController } from './infrastructure/controllers/CatalogController';
import { GetProduct } from './application/GetProduct';
import type { ProductRepository } from './domain/ProductRepository';

export interface CatalogDependenciesType {
    controller: CatalogController;
    apiRepo: ProductRepository;
    inMemoryRepo: ProductRepository;
    getProductUseCase: GetProduct;
}

/**
 * Create a fresh set of catalog dependencies.
 * Options:
 *  - useMemory: if true, use the in-memory repository for use-cases.
 */
export function createCatalogDependencies(options?: { useMemory?: boolean }) {
    const { useMemory = false } = options ?? {};

    const inMemoryRepo: ProductRepository = new InMemoryProductRepository();
    const apiRepo: ProductRepository = new ApiProductRepository();

    const repoForUseCases: ProductRepository = useMemory ? inMemoryRepo : apiRepo;

    const getProductUseCase = new GetProduct(repoForUseCases);
    const controller = new CatalogController(getProductUseCase);

    const deps: CatalogDependenciesType = {
        controller,
        apiRepo,
        inMemoryRepo,
        getProductUseCase,
    };

    return deps;
}

// Default (backwards-compatible) exports
export const { controller, apiRepo, inMemoryRepo, getProductUseCase } = createCatalogDependencies();

export const CatalogDependencies: CatalogDependenciesType = {
    controller,
    apiRepo,
    inMemoryRepo,
    getProductUseCase,
};

