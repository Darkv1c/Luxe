import { ApiProductRepository } from './infrastructure/repositories/ApiProductRepository';
import { InMemoryProductRepository } from './infrastructure/repositories/InMemoryProductRepository';
import { InMemoryBrandRepository } from './infrastructure/repositories/InMemoryBrandRepository';
import { InMemoryCategoryRepository } from './infrastructure/repositories/InMemoryCategoryRepository';
import { InMemoryReviewRepository } from './infrastructure/repositories/InMemoryReviewRepository';
import { CatalogController } from './infrastructure/controllers/CatalogController';
import { GetProduct } from './application/GetProduct';
import { GetAllProducts } from './application/GetAllProducts';
import { GetAllCategories } from './application/GetAllCategories';
import { GetAllBrands } from './application/GetAllBrands';
import { GetProductReviews } from './application/GetProductReviews';
import type { ProductRepository } from './domain/ProductRepository';
import type { BrandRepository } from './domain/BrandRepository';
import type { CategoryRepository } from './domain/CategoryRepository';
import type { ReviewRepository } from './domain/ReviewRepository';
import { testProducts, testBrands, testCategories, testReviews } from './TestData';

export interface CatalogDependenciesType {
    controller: CatalogController;
    apiRepo: ProductRepository;
    inMemoryRepo: ProductRepository;
    brandRepo: BrandRepository;
    categoryRepo: CategoryRepository;
    reviewRepo: ReviewRepository;
    getProductUseCase: GetProduct;
    getAllProductsUseCase: GetAllProducts;
    getAllCategoriesUseCase: GetAllCategories;
    getAllBrandsUseCase: GetAllBrands;
    getProductReviewsUseCase: GetProductReviews;
}

/**
 * Create a fresh set of catalog dependencies.
 * Options:
 *  - useMemory: if true, use the in-memory repository for use-cases.
 *  - withTestData: if true, populate in-memory repositories with test data.
 */
export function createCatalogDependencies(options?: { useMemory?: boolean; withTestData?: boolean }) {
    const { useMemory = false, withTestData = true } = options ?? {};

    // Initialize repositories with test data if requested
    const inMemoryRepo: ProductRepository = new InMemoryProductRepository(
        withTestData ? testProducts : undefined
    );
    const brandRepo: BrandRepository = new InMemoryBrandRepository(
        withTestData ? testBrands : undefined
    );
    const categoryRepo: CategoryRepository = new InMemoryCategoryRepository(
        withTestData ? testCategories : undefined
    );
    const reviewRepo: ReviewRepository = new InMemoryReviewRepository(
        withTestData ? testReviews : undefined
    );
    const apiRepo: ProductRepository = new ApiProductRepository();

    const repoForUseCases: ProductRepository = useMemory ? inMemoryRepo : apiRepo;

    // Create use cases
    const getProductUseCase = new GetProduct(repoForUseCases);
    const getAllProductsUseCase = new GetAllProducts(repoForUseCases);
    const getAllCategoriesUseCase = new GetAllCategories(categoryRepo);
    const getAllBrandsUseCase = new GetAllBrands(brandRepo);
    const getProductReviewsUseCase = new GetProductReviews(reviewRepo);

    const controller = new CatalogController(getProductUseCase, getAllProductsUseCase);

    const deps: CatalogDependenciesType = {
        controller,
        apiRepo,
        inMemoryRepo,
        brandRepo,
        categoryRepo,
        reviewRepo,
        getProductUseCase,
        getAllProductsUseCase,
        getAllCategoriesUseCase,
        getAllBrandsUseCase,
        getProductReviewsUseCase,
    };

    return deps;
}

// Default (backwards-compatible) exports with test data
export const {
    controller,
    apiRepo,
    inMemoryRepo,
    brandRepo,
    categoryRepo,
    reviewRepo,
    getProductUseCase,
    getAllProductsUseCase,
    getAllCategoriesUseCase,
    getAllBrandsUseCase,
    getProductReviewsUseCase
} = createCatalogDependencies();

export const CatalogDependencies: CatalogDependenciesType = {
    controller,
    apiRepo,
    inMemoryRepo,
    brandRepo,
    categoryRepo,
    reviewRepo,
    getProductUseCase,
    getAllProductsUseCase,
    getAllCategoriesUseCase,
    getAllBrandsUseCase,
    getProductReviewsUseCase,
};

