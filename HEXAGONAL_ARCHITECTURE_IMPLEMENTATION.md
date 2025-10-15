# Hexagonal Architecture Implementation

This document describes the hexagonal architecture implementation for the Luxe design system.

## Overview

The catalog domain has been implemented following hexagonal architecture (Ports & Adapters pattern) with the following entities:

- **Product**: Core product entity with rich metadata
- **Category**: Product categorization with hierarchical support
- **Brand**: Product brands with logos and descriptions
- **Review**: Customer reviews with ratings and verification status

## Architecture Structure

Each entity follows the same structure:

```
src/core/catalog/
├── domain/                   # Core business logic (entities + interfaces)
│   ├── Product.ts
│   ├── ProductRepository.ts
│   ├── Category.ts
│   ├── CategoryRepository.ts
│   ├── Brand.ts
│   ├── BrandRepository.ts
│   ├── Review.ts
│   └── ReviewRepository.ts
├── application/              # Use cases (business operations)
│   ├── GetProduct.ts
│   ├── GetProduct.test.ts
│   ├── GetAllProducts.ts
│   ├── GetAllProducts.test.ts
│   ├── GetAllCategories.ts
│   ├── GetAllCategories.test.ts
│   ├── GetAllBrands.ts
│   ├── GetAllBrands.test.ts
│   ├── GetProductReviews.ts
│   └── GetProductReviews.test.ts
├── infrastructure/           # External adapters
│   ├── controllers/
│   │   └── CatalogController.ts
│   └── repositories/
│       ├── InMemoryProductRepository.ts
│       ├── InMemoryBrandRepository.ts
│       ├── InMemoryCategoryRepository.ts
│       ├── InMemoryReviewRepository.ts
│       └── ApiProductRepository.ts
├── Dependencies.ts           # Dependency injection configuration
├── TestData.ts              # Test data for all entities
└── index.ts                 # Barrel exports

API Routes:
src/app/api/
├── catalog/route.ts         # GET /api/catalog
├── categories/route.ts      # GET /api/categories
├── brands/route.ts          # GET /api/brands
└── reviews/route.ts         # GET /api/reviews?productId=<id>
```

## Entities

### Product
Enhanced with the following fields:
- `id`, `name`, `priceCents` (original fields)
- `description`: Product description
- `categoryId`: Reference to category
- `brandId`: Reference to brand
- `images[]`: Product images
- `stock`: Inventory count
- `rating`: Average rating (1-5)
- `reviewCount`: Number of reviews
- `tags[]`: Search/filter tags
- `specifications`: Key-value metadata

### Category
- `id`, `name`: Basic identification
- `description`: Category description
- `parentId`: Support for subcategories
- `imageUrl`: Category image
- `slug`: URL-friendly identifier

### Brand
- `id`, `name`: Basic identification
- `description`: Brand description
- `logoUrl`: Brand logo
- `website`: Brand website URL
- `slug`: URL-friendly identifier

### Review
- `id`, `productId`, `userId`: Basic identification
- `userName`: Reviewer name
- `rating`: Star rating (1-5)
- `title`: Review title
- `comment`: Review text
- `createdAt`: Review date
- `verified`: Verified purchase status
- `helpful`: Helpful votes count

## Test Data

### Products: 52 items across 8 categories

**Electronics - Smartphones (10 products)**
- TechPro X1 Smartphone ($799.99) - Flagship with OLED, 5G, 108MP camera
- TechPro Mini Phone ($499.99) - Compact powerhouse
- GigaTech Z9 Pro ($899.99) - Ultra-premium with 200MP camera
- TechPro Budget Phone ($199.99) - Affordable essential
- GigaTech Fold Max ($1,499.99) - Foldable innovation
- TechPro Camera Phone ($699.99) - Photography-focused
- GigaTech Gaming Phone ($799.99) - Mobile gaming powerhouse
- TechPro Senior Phone ($149.99) - Senior-friendly
- GigaTech Rugged Phone ($399.99) - Waterproof and shockproof
- TechPro Eco Phone ($449.99) - Environmentally friendly

**Electronics - Laptops (10 products)**
- GigaTech UltraBook Pro ($1,299.99) - Professional laptop
- TechPro Gaming Laptop ($1,799.99) - RTX gaming laptop
- GigaTech Slim Notebook ($799.99) - Lightweight student laptop
- TechPro Workstation ($2,499.99) - Professional workstation
- GigaTech Budget Laptop ($449.99) - Affordable basic laptop
- TechPro 2-in-1 Convertible ($1,099.99) - Versatile tablet/laptop
- GigaTech Business Pro ($1,399.99) - Enterprise-grade
- TechPro Ultra Thin ($1,499.99) - Premium ultra-thin
- GigaTech Chromebook ($349.99) - Fast and secure
- TechPro Creator Laptop ($1,999.99) - Content creation optimized

**Electronics - Audio (10 products)**
- SoundWave Elite Headphones ($349.99) - Noise-canceling premium
- SoundWave Sport Earbuds ($129.99) - Waterproof wireless
- TechPro Studio Monitor ($899.99) - Professional monitors
- SoundWave Portable Speaker ($199.99) - Bluetooth portable
- TechPro Wireless Earbuds Pro ($249.99) - Premium ANC earbuds
- SoundWave Gaming Headset ($149.99) - Immersive gaming
- TechPro Soundbar ($449.99) - Home theater soundbar
- SoundWave Budget Earbuds ($59.99) - Affordable wireless
- TechPro Studio Headphones ($599.99) - Professional studio
- SoundWave Party Speaker ($399.99) - Large RGB party speaker

**Fashion - Men's Clothing (8 products)**
- StyleCo Classic T-Shirt ($29.99) - Premium cotton
- UrbanStyle Denim Jeans ($79.99) - Modern fit denim
- StyleCo Formal Shirt ($49.99) - Business dress shirt
- UrbanStyle Hoodie ($59.99) - Comfortable pullover
- StyleCo Chinos ($69.99) - Versatile chino pants
- UrbanStyle Bomber Jacket ($129.99) - Trendy bomber
- StyleCo Sneakers ($89.99) - Comfortable casual
- UrbanStyle Leather Belt ($39.99) - Genuine leather

**Fashion - Women's Clothing (6 products)**
- StyleCo Summer Dress ($59.99) - Light summer dress
- UrbanStyle Yoga Pants ($49.99) - High-waisted leggings
- StyleCo Blouse ($44.99) - Elegant office blouse
- UrbanStyle Cardigan ($69.99) - Cozy knit cardigan
- StyleCo High Heels ($99.99) - Classic elegant heels
- UrbanStyle Handbag ($119.99) - Stylish handbag

**Home & Garden (3 products)**
- HomeEssentials Vacuum Cleaner ($299.99) - Cordless vacuum
- HomeEssentials Coffee Maker ($149.99) - Programmable coffee maker
- HomeEssentials Bed Sheets Set ($79.99) - Egyptian cotton sheets

**Sports & Outdoors (3 products)**
- ActiveGear Running Shoes ($129.99) - High-performance running
- ActiveGear Yoga Mat ($49.99) - Non-slip eco-friendly
- ActiveGear Water Bottle ($29.99) - Insulated stainless steel

**Books (2 products)**
- JavaScript: The Complete Guide ($49.99) - Programming book
- Design Patterns for Modern Apps ($59.99) - Software design

### Categories: 10 items
- Electronics (cat-1)
  - Smartphones (cat-2)
  - Laptops (cat-3)
  - Audio (cat-4)
- Fashion (cat-5)
  - Men's Clothing (cat-6)
  - Women's Clothing (cat-7)
- Home & Garden (cat-8)
- Sports & Outdoors (cat-9)
- Books (cat-10)

### Brands: 8 items
- TechPro - Premium electronics manufacturer
- StyleCo - Fashion and lifestyle brand
- SoundWave - Audio equipment specialist
- ActiveGear - Sports and outdoor equipment
- HomeEssentials - Quality home products
- ReadMore - Publishing house
- GigaTech - Computing solutions
- UrbanStyle - Contemporary fashion

### Reviews: 5 sample reviews
- 2 reviews for TechPro X1 Smartphone (ratings: 5, 4)
- 1 review for TechPro Gaming Laptop (rating: 5)
- 1 review for SoundWave Elite Headphones (rating: 5)
- 1 review for StyleCo Classic T-Shirt (rating: 4)

## API Endpoints

All endpoints return test data from in-memory repositories:

### GET /api/catalog
Returns all 52 products with full details.

**Response:**
```json
{
  "success": true,
  "data": [/* array of products */],
  "count": 52
}
```

### GET /api/categories
Returns all 10 categories.

**Response:**
```json
{
  "success": true,
  "data": [/* array of categories */],
  "count": 10
}
```

### GET /api/brands
Returns all 8 brands.

**Response:**
```json
{
  "success": true,
  "data": [/* array of brands */],
  "count": 8
}
```

### GET /api/reviews
Returns all reviews or reviews for a specific product.

**Query Parameters:**
- `productId` (optional): Filter reviews by product ID

**Response:**
```json
{
  "success": true,
  "data": [/* array of reviews */],
  "count": 5
}
```

## Testing

All use cases have comprehensive tests following TDD principles:

- **201 tests passing** (190 UI component tests + 11 catalog tests)
- **Test coverage**: 90%+ on all metrics (enforced)
- **Test files**: All use cases have corresponding `.test.ts` files

### Running Tests

```bash
npm test              # Run once
npm run test:watch    # Watch mode
npm run test:coverage # Check coverage
```

## Building

The project builds successfully with all routes:

```bash
npm run build
```

Build output shows all API routes are correctly configured:
- / (Static homepage)
- /api/catalog (Dynamic)
- /api/categories (Dynamic)
- /api/brands (Dynamic)
- /api/reviews (Dynamic)

## Usage Example

```typescript
import { createCatalogDependencies } from '@/core/catalog';

// Create dependencies with test data
const deps = createCatalogDependencies({ 
  useMemory: true,    // Use in-memory repository
  withTestData: true  // Load test data
});

// Use the dependencies
const products = await deps.getAllProductsUseCase.execute();
const categories = await deps.getAllCategoriesUseCase.execute();
const brands = await deps.getAllBrandsUseCase.execute();
const reviews = await deps.getProductReviewsUseCase.execute('1');
```

## Design Principles

1. **Separation of Concerns**: Domain logic is isolated from infrastructure
2. **Dependency Inversion**: Use cases depend on abstractions (repository interfaces), not implementations
3. **Testability**: All use cases are easily testable with mock repositories
4. **Single Responsibility**: Each class/function has one clear purpose
5. **Test-Driven Development**: Tests written before implementation (RED-GREEN-REFACTOR)

## Next Steps

Potential enhancements:
- Add database persistence (PostgreSQL/MongoDB adapter)
- Implement authentication and user management
- Add shopping cart and checkout bounded contexts
- Implement search and filtering use cases
- Add product inventory management
- Create admin panel for CRUD operations
