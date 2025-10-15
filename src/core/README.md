# Core (Hexagonal Architecture)

This folder contains the implementation of the **Hexagonal Architecture** (Ports & Adapters pattern) for bounded contexts.

## Structure

Each bounded context follows this mandatory structure:

```
src/core/<Context>/
├── application/              # Use-cases (pure orchestration)
│   ├── GetProduct.ts
│   └── GetProduct.test.ts   # Tests written FIRST (TDD)
├── domain/                   # Entities and ports (interfaces)
│   ├── Product.ts           # Domain entities
│   └── ProductRepository.ts # Interface / Port
├── infrastructure/           # Adapters (controllers, repositories, mappers)
│   ├── controllers/
│   │   └── CatalogController.ts
│   ├── repositories/
│   │   ├── ApiProductRepository.ts
│   │   └── InMemoryProductRepository.ts
│   └── mappers/
│       └── ProductMapper.ts
├── Dependencies.ts           # Composition root (wiring)
└── index.ts                  # Barrel export for the context
```

## Example: Catalog Context

The `catalog` context demonstrates the complete implementation:

```
src/core/catalog/
├── application/
│   ├── GetProduct.ts         # Use-case implementation
│   └── GetProduct.test.ts    # Comprehensive tests (90%+ coverage)
├── domain/
│   ├── Product.ts            # Product entity
│   └── ProductRepository.ts  # Repository interface (port)
├── infrastructure/
│   ├── controllers/
│   │   └── CatalogController.ts
│   ├── repositories/
│   │   ├── ApiProductRepository.ts      # HTTP API adapter
│   │   └── InMemoryProductRepository.ts # In-memory adapter
│   └── mappers/
│       └── ProductMapper.ts  # External data → Domain model
├── Dependencies.ts           # Wires all dependencies
└── index.ts                  # Public API exports
```

## Rules

### 1. Separation of Concerns

- **`domain/`**: Contains ONLY types, entities, and ports (interfaces). No I/O or infrastructure references.
- **`application/`**: Pure use-cases that orchestrate domain logic. Write tests FIRST (TDD) before implementation.
- **`infrastructure/`**: Adapters (HTTP controllers, DB/API repositories, mappers, clients).
- **`Dependencies.ts`**: The SINGLE place to instantiate concrete implementations and compose controllers/use-cases.

### 2. File Naming

Use **CamelCase** for all TypeScript files:
- `GetProduct.ts`
- `ProductRepository.ts`
- `Dependencies.ts`
- `ProductMapper.ts`

### 3. Controllers

Controllers live under `infrastructure/controllers/`. 

**Recommended pattern**: Inject use-cases into controllers (not repositories).

```typescript
// ✅ GOOD: Controller receives use-case
export class CatalogController {
  constructor(private getProductUseCase: GetProduct) {}
  
  async getProduct(id: string) {
    return this.getProductUseCase.execute(id);
  }
}

// Wiring in Dependencies.ts:
const getProduct = new GetProduct(apiRepo);
const controller = new CatalogController(getProduct);
```

```typescript
// ❌ BAD: Controller creates use-case internally
export class CatalogController {
  constructor(private repo: ProductRepository) {}
  
  async getProduct(id: string) {
    const useCase = new GetProduct(this.repo); // Don't do this
    return useCase.execute(id);
  }
}
```

### 4. Mappers

Transformations between external shapes (API responses) and domain models must live under `infrastructure/mappers/`:

```typescript
// infrastructure/mappers/ProductMapper.ts
export function mapExternalToProduct(external: ExternalProduct): Product {
  return {
    id: external.productId,
    name: external.productName,
    priceCents: external.price * 100,
  };
}
```

Use mappers in infrastructure repositories:

```typescript
// infrastructure/repositories/ApiProductRepository.ts
async findById(id: string): Promise<Product | null> {
  const response = await fetch(`/api/products/${id}`);
  const external = await response.json();
  return mapExternalToProduct(external);
}
```

### 5. HTTP/Clients

- **Do NOT** call `fetch` directly from `domain`.
- Use an HTTP wrapper or injectable client from `infrastructure`.
- Convert responses into domain types via mappers.
- Consider injecting an `HttpClient` for testability.

### 6. Tests (TDD Mandatory)

Follow strict **Test-Driven Development**:

1. Create `GetProduct.test.ts` next to the use-case in `application/`
2. Write failing tests (RED phase)
3. Mock `ProductRepository` with `vi.fn()` or use `InMemoryProductRepository`
4. Implement minimal code to pass tests (GREEN phase)
5. Refactor while keeping tests green (REFACTOR phase)

**Coverage requirements** (enforced in `vitest.config.ts`):
- Branches: 90%
- Functions: 90%
- Lines: 90%
- Statements: 90%

**What to test**:
- Happy path (successful execution)
- Null/empty results
- Error handling (invalid input, repository errors)
- Edge cases (special characters, long IDs, etc.)

```typescript
// application/GetProduct.test.ts
import { describe, it, expect, vi } from 'vitest';
import { GetProduct } from './GetProduct';

describe('GetProduct', () => {
  it('should return product when found', async () => {
    const mockRepo = {
      findById: vi.fn().mockResolvedValue({ id: '1', name: 'Test' }),
      save: vi.fn(),
      listAll: vi.fn(),
    };
    const useCase = new GetProduct(mockRepo);
    
    const result = await useCase.execute('1');
    
    expect(result).toEqual({ id: '1', name: 'Test' });
    expect(mockRepo.findById).toHaveBeenCalledWith('1');
  });

  it('should return null when not found', async () => {
    const mockRepo = {
      findById: vi.fn().mockResolvedValue(null),
      save: vi.fn(),
      listAll: vi.fn(),
    };
    const useCase = new GetProduct(mockRepo);
    
    const result = await useCase.execute('999');
    
    expect(result).toBeNull();
  });

  it('should throw error for invalid id', async () => {
    const mockRepo = {
      findById: vi.fn(),
      save: vi.fn(),
      listAll: vi.fn(),
    };
    const useCase = new GetProduct(mockRepo);
    
    await expect(useCase.execute('')).rejects.toThrow('Product ID is required');
  });
});
```

### 7. Dependencies Wiring

Export a typed object from `Dependencies.ts`:

```typescript
// Dependencies.ts
export interface CatalogDependenciesType {
  controller: CatalogController;
  apiRepo: ProductRepository;
  inMemoryRepo: ProductRepository;
  getProductUseCase: GetProduct;
}

const inMemoryRepo = new InMemoryProductRepository();
const apiRepo = new ApiProductRepository();
const getProductUseCase = new GetProduct(apiRepo);

export const CatalogDependencies: CatalogDependenciesType = {
  controller: new CatalogController(getProductUseCase),
  apiRepo,
  inMemoryRepo,
  getProductUseCase,
};

// Export individual parts for testing flexibility
export { apiRepo, inMemoryRepo, getProductUseCase };
```

### 8. Avoid Case-Only Filename Collisions

**NEVER** create files that differ only by casing:
- ❌ `Dependencies.ts` vs `dependencies.ts`
- ❌ `Controller.ts` vs `controller.ts`

This causes TypeScript and CI problems on case-insensitive filesystems.

### 9. Barrel Exports

Add an `index.ts` barrel in the context root to export the public API:

```typescript
// index.ts
export * from './domain/Product';
export * from './domain/ProductRepository';
export * from './application/GetProduct';
export * from './infrastructure/repositories/InMemoryProductRepository';
export * from './infrastructure/repositories/ApiProductRepository';
export * from './Dependencies';
```

## Quick Reference

| Layer | Purpose | Examples | Rules |
|-------|---------|----------|-------|
| **domain/** | Core business logic | `Product.ts`, `ProductRepository.ts` | No I/O, no framework dependencies |
| **application/** | Use-cases | `GetProduct.ts`, `CreateProduct.ts` | Orchestrates domain, tests FIRST |
| **infrastructure/** | External adapters | Controllers, repositories, mappers | Implements domain interfaces |
| **Dependencies.ts** | Composition root | Wiring all dependencies | Single source of truth for DI |

## Testing Commands

```bash
npm run test          # Run once
npm run test:watch    # Watch mode (use during development)
npm run test:ui       # Visual UI
npm run test:coverage # Check coverage thresholds (90%+)
```

## Best Practices

1. ✅ **Write tests FIRST** (TDD is mandatory)
2. ✅ **Keep domain pure** (no infrastructure dependencies)
3. ✅ **Inject dependencies** (use `Dependencies.ts` for wiring)
4. ✅ **Use mappers** for external data transformations
5. ✅ **Export both object and parts** from Dependencies (flexibility)
6. ✅ **Follow naming conventions** (CamelCase for all TS files)
7. ✅ **Document in English** (all comments, docs, PRs)

## Anti-Patterns to Avoid

❌ Creating use-cases inside controllers  
❌ Calling `fetch` from domain layer  
❌ Instantiating infrastructure inside domain  
❌ Skipping tests or writing them after implementation  
❌ Case-only filename variations  
❌ Hardcoding dependencies instead of injecting  

---

For more details, see `.github/copilot-instructions.md` section on Hexagonal Architecture.

