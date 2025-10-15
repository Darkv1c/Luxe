// Domain exports
export * from './domain/Product';
export * from './domain/ProductRepository';
export * from './domain/Category';
export * from './domain/CategoryRepository';
export * from './domain/Brand';
export * from './domain/BrandRepository';
export * from './domain/Review';
export * from './domain/ReviewRepository';

// Application exports
export * from './application/GetProduct';
export * from './application/GetAllProducts';
export * from './application/GetAllCategories';
export * from './application/GetAllBrands';
export * from './application/GetProductReviews';

// Infrastructure exports
export * from './infrastructure/repositories/InMemoryProductRepository';
export * from './infrastructure/repositories/InMemoryBrandRepository';
export * from './infrastructure/repositories/InMemoryCategoryRepository';
export * from './infrastructure/repositories/InMemoryReviewRepository';
export * from './infrastructure/repositories/ApiProductRepository';

// Dependencies
export * from './Dependencies';

// Test data
export * from './TestData';
