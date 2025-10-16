# Luxe Design System - AI Agent Instructions

## Project Overview
Luxe is a Next.js 15 + React 19 design system built with **strict Test-Driven Development (TDD)**. Every component must have comprehensive tests written BEFORE implementation. This is not optional.


### HTTP patterns: GETs, endpoints and Server Actions

When designing how to fetch or mutate data from the app, follow these simple rules to keep separation of concerns, testability and the hexagonal architecture intact:

- One-time GETs that should be called exactly once for the page (data used by the server-rendered UI and not re-fetched on the client) should be fetched in Server Components (server-side). Use server components to call repositories/use-cases or to delegate to controllers via `Dependencies.ts`. This keeps fast, cacheable renders and keeps UI logic on the server.

- Repeated or dynamic GETs (for example: the same page may fetch different data when search params change, or the request must be retried from the client) should be done from the client against an endpoint (Next.js `app/api/.../route.ts`), and the client component should call that endpoint. Treat different search params as different pages for caching/routing concerns.

- Mutations (POST / PUT / DELETE) must be implemented as Server Actions. Server Actions are the recommended pattern for forms and mutating operations invoked from components because they run on the server, integrate with RSC semantics, and keep mutation side-effects off the client. Server Actions should delegate to application use-cases/controllers (via `Dependencies.ts`) to perform business logic and persistence.

Guidelines and examples:

- Server Component GET (one-time):
  - Where: inside a server component (page or layout) or a controller called from it.
  - Why: called once per render, can use server-side resources and caching.

- Client endpoint GET (dynamic / multiple calls):
  - Where: implement a Next.js API route under `src/app/api/.../route.ts` and call it from client components using `fetch` or a client data hook.
  - Why: endpoints are explicit HTTP adapters; use them when the client must re-request data during the page lifecycle or when different search params produce different results.

- Server Actions for mutations:
  - Where: define a Server Action and have it delegate to a use-case/controller from `src/core/...`.
  - Why: keeps mutation logic server-side, testable, and aligned with React Server Components and Next.js conventions.

Note: Always keep business logic inside use-cases (application/) and controllers (infrastructure/) — Server Actions and endpoints should orchestrate and delegate, not contain domain logic.

## Tech Stack
- **Next.js 15.5.5** with App Router + Turbopack
- **React 19.1.0** with TypeScript (strict mode)
- **CSS Modules** + **Tailwind CSS 4.0** for styling
- **Vitest** + **React Testing Library** for testing (NOT Jest)
- Path alias: `@/*` → `./src/*`

## Critical TDD Workflow (MANDATORY)

**🚨 NEVER write component code before tests.** Follow this exact sequence:

1. **Create test file first**: `ComponentName.test.tsx`
2. **Write failing tests** (RED phase)
3. **Run tests in watch mode**: `npm run test:watch`
4. **Implement minimal code** to pass tests (GREEN phase)
5. **Refactor** while keeping tests green (REFACTOR phase)
6. **Verify coverage**: Must achieve 90%+ (enforced in `vitest.config.ts`)

### Test Commands
```bash
npm run test          # Run once
npm run test:watch    # Watch mode (use during development)
npm run test:ui       # Visual UI
npm run test:coverage # Check coverage thresholds
```

## Component Structure (Fixed Pattern)

Every UI component follows this exact structure:
```
src/components/ui/ComponentName/
├── index.ts                    # Barrel export
├── ComponentName.tsx           # Implementation
├── ComponentName.module.css    # CSS Modules with Tailwind
└── ComponentName.test.tsx      # Tests (written FIRST)
```

### Component Template
```tsx
// ComponentName.tsx
import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import styles from './ComponentName.module.css';

export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.component, styles[variant], styles[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### Component placement: global vs view-local

Guideline:
- Put reusable, global components (buttons, inputs, icons, layout primitives) under `src/components/ui/` or `src/components/` so they can be imported across the app.
- Put view-specific or page-specific components next to the page or feature that uses them. For example, if a component is only used by the checkout page, place it under `src/app/checkout/components/` or `src/components/checkout/` (choose one consistent pattern for the repo).

Examples:
- Global Button: `src/components/ui/Button/`
- Page-local PromoBanner used only on `/app/home`: `src/app/home/components/PromoBanner/` or `src/components/home/PromoBanner/`

Rationale:
- Keeps the global component library small and discoverable.
- Makes it clear which components are shared vs coupled to a specific UI flow, reducing accidental API surface growth.

### CSS Module Pattern
```css
/* ComponentName.module.css */
@import "tailwindcss/theme" reference;

.component {
  @apply inline-flex items-center justify-center rounded-md;
  @apply transition-colors duration-200;
  @apply focus-visible:outline-none focus-visible:ring-2;
}

.primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.sm {
  @apply text-sm px-3 py-1.5;
}
```

### Test Template (Write FIRST)
```tsx
// ComponentName.test.tsx
import { render, screen } from '@/lib/test-utils';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders children correctly', () => {
    render(<ComponentName>Content</ComponentName>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(<ComponentName variant="secondary">Test</ComponentName>);
    expect(screen.getByText('Test').className).toMatch(/secondary/);
  });

  it('accepts custom className', () => {
    render(<ComponentName className="custom">Test</ComponentName>);
    expect(screen.getByText('Test')).toHaveClass('custom');
  });

  it('forwards ref to element', () => {
    const ref = { current: null };
    render(<ComponentName ref={ref}>Test</ComponentName>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
```

### Barrel Export Pattern
```typescript
// index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

Then update `src/components/ui/index.ts`:
```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

## Design Tokens

### Token Structure
Design tokens are centralized in `src/lib/tokens/` and follow atomic design principles:

```typescript
// src/lib/tokens/colors.ts
import { colors } from '@/lib/tokens';

// Color scales (50 = lightest, 950 = darkest)
colors.primary[50]   // #eff6ff - Backgrounds, subtle highlights
colors.primary[500]  // #3b82f6 - Default brand color
colors.primary[700]  // #1d4ed8 - Hover states
colors.primary[900]  // #1e3a8a - Text on light backgrounds

// Semantic colors
colors.success[500]  // #22c55e - Success states
colors.warning[500]  // #f59e0b - Warning states  
colors.error[500]    // #ef4444 - Error states
colors.neutral[500]  // #6b7280 - Neutral UI elements
```

```typescript
// src/lib/tokens/spacing.ts
import { spacing } from '@/lib/tokens';

spacing[0]    // 0
spacing[1]    // 0.25rem (4px)
spacing[2]    // 0.5rem (8px)
spacing[4]    // 1rem (16px)
spacing[8]    // 2rem (32px)
spacing[16]   // 4rem (64px)
```

### Figma to Code Mapping

**Design tokens from Figma variables:**
- Figma color variables → `src/lib/tokens/colors.ts`
- Figma spacing variables → `src/lib/tokens/spacing.ts`
- Figma typography variables → `src/lib/tokens/typography.ts`

**Component properties mapping:**
- Figma Auto Layout → CSS Flexbox/Grid (`@apply flex`, `@apply grid`)
- Figma padding → Tailwind padding classes (`px-4`, `py-2`)
- Figma border radius → Tailwind rounded utilities (`rounded-md`)
- Figma effects → Tailwind utilities (`shadow-sm`, `transition-colors`)

**Extracting values from Figma:**
1. Use Figma's Dev Mode to inspect design tokens
2. Copy spacing values directly (e.g., 16px → `spacing[4]`)
3. Copy color hex values and match to token scale
4. Note typography styles (font size, weight, line height)

Color scales: 50, 100, 200, 300, 400, 500 (default), 600, 700, 800, 900, 950
Spacing: Tailwind scale (0, px, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4... 96)

## Testing Requirements

**Coverage thresholds (enforced):**
- Branches: 90%
- Functions: 90%
- Lines: 90%
- Statements: 90%

**Must test:**
- All component variants and sizes
- User interactions (clicks, inputs, keyboard navigation)
- Accessibility (ARIA attributes, roles, keyboard support)
- CSS class application (use `.toMatch(/className/)`)
- Ref forwarding (for components using `forwardRef`)
- Edge cases (empty state, disabled, error states)
- Focus management and focus trapping
- Screen reader announcements

**Testing utilities:**
- Use `@/lib/test-utils` for custom render (NOT directly from RTL)
- Use `userEvent.setup()` for interactions (NOT `fireEvent`)
- Use `vi.fn()` for mocks (Vitest, NOT Jest)

### Accessibility Testing Patterns

**Keyboard Navigation Tests:**
```tsx
describe('ComponentName - Keyboard Navigation', () => {
  it('should be focusable with Tab key', async () => {
    const user = userEvent.setup();
    render(<ComponentName>Test</ComponentName>);
    
    await user.tab();
    expect(screen.getByText('Test')).toHaveFocus();
  });

  it('should activate with Enter key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should activate with Space key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    screen.getByRole('button').focus();
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should skip when disabled', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Button>First</Button>
        <Button disabled>Disabled</Button>
        <Button>Last</Button>
      </>
    );
    
    await user.tab();
    expect(screen.getByText('First')).toHaveFocus();
    await user.tab();
    expect(screen.getByText('Last')).toHaveFocus();
  });
});
```

**ARIA and Semantic HTML Tests:**
```tsx
describe('ComponentName - Accessibility', () => {
  it('should have correct ARIA role', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should have aria-label when no visible text', () => {
    render(<IconButton aria-label="Close dialog" icon="close" />);
    expect(screen.getByRole('button', { name: /close dialog/i })).toBeInTheDocument();
  });

  it('should mark invalid input with aria-invalid', () => {
    render(<Input error errorMessage="Required field" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should link error message with aria-describedby', () => {
    render(<Input id="email" error errorMessage="Invalid email" />);
    const input = screen.getByRole('textbox');
    const errorId = input.getAttribute('aria-describedby');
    expect(errorId).toBeTruthy();
    expect(screen.getByText('Invalid email')).toHaveAttribute('id', errorId);
  });

  it('should associate label with input', () => {
    render(<Input label="Email address" />);
    const input = screen.getByLabelText(/email address/i);
    expect(input).toBeInTheDocument();
  });

  it('should indicate required fields', () => {
    render(<Input label="Password" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
```

**Focus Management Tests:**
```tsx
describe('Modal - Focus Management', () => {
  it('should trap focus inside modal', async () => {
    const user = userEvent.setup();
    render(
      <Modal open>
        <button>First</button>
        <button>Second</button>
        <button>Close</button>
      </Modal>
    );
    
    const buttons = screen.getAllByRole('button');
    await user.tab();
    expect(buttons[0]).toHaveFocus();
    
    await user.tab();
    await user.tab();
    await user.tab(); // Should cycle back
    expect(buttons[0]).toHaveFocus();
  });

  it('should restore focus on close', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <>
        <button>Trigger</button>
        <Modal open={false} />
      </>
    );
    
    screen.getByText('Trigger').focus();
    expect(screen.getByText('Trigger')).toHaveFocus();
    
    rerender(
      <>
        <button>Trigger</button>
        <Modal open />
      </>
    );
    
    rerender(
      <>
        <button>Trigger</button>
        <Modal open={false} />
      </>
    );
    
    expect(screen.getByText('Trigger')).toHaveFocus();
  });
});
```

**Screen Reader Tests:**
```tsx
describe('Loading - Screen Reader', () => {
  it('should announce loading state', () => {
    render(<Loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('should have descriptive text for screen readers', () => {
    render(<Loading text="Loading data..." />);
    expect(screen.getByText(/loading data/i)).toBeInTheDocument();
  });
});
```

## Key Files Reference

- **Utils**: `src/lib/utils/cn.ts` - Class name merger (uses `clsx`)
- **Test setup**: `vitest.setup.ts` - CSS modules mocked, jest-dom imported
- **Custom render**: `src/lib/test-utils/index.ts` - Wraps RTL render
- **Design tokens**: `src/lib/tokens/` - Colors, spacing, typography
- **Example component**: `src/components/ui/Button/` - Reference implementation

## Accessibility Standards

All components must meet WCAG 2.1 Level AA standards:

### Keyboard Navigation Requirements
- **Tab**: Move focus forward through interactive elements
- **Shift+Tab**: Move focus backward
- **Enter**: Activate buttons, links, submit forms
- **Space**: Activate buttons, toggle checkboxes, open dropdowns
- **Escape**: Close modals, dropdowns, cancel operations
- **Arrow keys**: Navigate within composite widgets (menus, tabs, sliders)
- **Home/End**: Jump to first/last item in lists
- Disabled elements must be skipped in tab order

### Semantic HTML & ARIA
```tsx
// ✅ GOOD: Semantic button
<button onClick={handleClick}>Submit</button>

// ❌ BAD: Div masquerading as button
<div onClick={handleClick}>Submit</div>

// ✅ GOOD: Icon button with label
<button aria-label="Close dialog" onClick={onClose}>
  <CloseIcon />
</button>

// ✅ GOOD: Input with proper labels
<label htmlFor="email">Email</label>
<input 
  id="email" 
  type="email"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && <span id="email-error" role="alert">{errorMessage}</span>}
```

### Focus Management
```tsx
// Focus indicators (in CSS)
.button {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2;
  @apply focus-visible:ring-blue-500;
}

// Focus trapping in modals
useEffect(() => {
  if (!open) return;
  
  const focusableElements = modalRef.current?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements?.[0];
  const lastElement = focusableElements?.[focusableElements.length - 1];
  
  firstElement?.focus();
  
  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement?.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement?.focus();
    }
  };
  
  document.addEventListener('keydown', handleTab);
  return () => document.removeEventListener('keydown', handleTab);
}, [open]);
```

### Color Contrast
- **Normal text (< 18px)**: Minimum 4.5:1 contrast ratio
- **Large text (≥ 18px or ≥ 14px bold)**: Minimum 3:1 contrast ratio
- **Interactive elements**: Minimum 3:1 against background
- Use design tokens from `src/lib/tokens/colors.ts` - pre-validated for contrast

### Screen Reader Support
```tsx
// Loading states
<div role="status" aria-live="polite">
  Loading...
</div>

// Error announcements
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>

// Hidden but readable by screen readers
<span className="sr-only">Additional context</span>

// CSS for sr-only
.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Required Accessibility Props by Component Type

**Buttons:**
- Use `<button>` element (not div with onClick)
- Include `aria-label` if no visible text
- Add `disabled` attribute (not just aria-disabled)

**Form Inputs:**
- Must have associated `<label>` with matching `htmlFor`/`id`
- Include `aria-invalid` when validation fails
- Link error messages with `aria-describedby`
- Mark required fields with `required` attribute

**Images:**
- Decorative: `alt=""` or `aria-hidden="true"`
- Informative: Descriptive `alt` text
- Icons as buttons: `aria-label` on button, `aria-hidden="true"` on icon

**Dialogs/Modals:**
- Use `role="dialog"` and `aria-modal="true"`
- Include `aria-labelledby` pointing to title
- Trap focus within dialog
- Close on Escape key
- Restore focus on close

**Dropdowns/Selects:**
- Use native `<select>` when possible
- Custom dropdowns need `role="combobox"` or `role="listbox"`
- Arrow key navigation required
- Announce selection changes

## Icon System & Assets

### Icon Component Pattern
Icons are implemented as React components with consistent props:

```tsx
// src/components/ui/Icon/Icon.tsx
export type IconName = 'check' | 'close' | 'chevron-down' | 'search' | 'star';

export interface IconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-hidden'?: boolean;
}

// Usage in components
<Icon name="check" size="sm" aria-hidden="true" />
<IconButton icon="close" aria-label="Close dialog" />
```

### SVG Icon Guidelines
- Store inline SVGs in the Icon component
- Use `currentColor` for fill/stroke (inherits text color)
- Always include `aria-hidden="true"` on decorative icons
- Provide `aria-label` on parent element for interactive icons
- Size icons using CSS classes (not hardcoded width/height)

### Asset Management
- Static assets: `/public/` directory
- Images referenced with `/image-name.png` (Next.js serves from public)
- Use Next.js `<Image>` component for optimization
- SVG icons: inline in components (not as files)

```tsx
// Optimized images with Next.js
import Image from 'next/image';

<Image 
  src="/logo.png" 
  alt="Luxe logo"
  width={200}
  height={50}
  priority // for above-the-fold images
/>
```

## Common Patterns

### Conditional CSS Classes
```tsx
className={cn(
  styles.base,
  styles[variant],
  { [styles.disabled]: disabled },
  className
)}
```

### Props Interface Extending HTML
```tsx
// For divs
extends HTMLAttributes<HTMLDivElement>

// For buttons (exclude 'children' if custom type)
extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

// For inputs (exclude 'size' if custom)
extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>
```

### Error Handling with Messages
```tsx
{error && errorMessage && (
  <span id={`${id}-error`} className={styles.errorMessage}>
    {errorMessage}
  </span>
)}
```

### Required Field Indicators
```tsx
{label && (
  <label htmlFor={id}>
    {label}
    {required && <span className={styles.required}>*</span>}
  </label>
)}
```

## What NOT to Do

❌ Write implementation before tests
❌ Use `fireEvent` (use `userEvent` instead)
❌ Import directly from `@testing-library/react` (use `@/lib/test-utils`)
❌ Use Jest syntax (`jest.fn()` → use `vi.fn()`)
❌ Skip accessibility attributes
❌ Hardcode colors/spacing (use design tokens)
❌ Forget `forwardRef` for wrapper components
❌ Miss `displayName` on forwarded ref components
❌ Skip coverage checks
❌ Use `div` with `onClick` instead of `button`
❌ Omit keyboard event handlers (Enter/Space for buttons)
❌ Forget to link labels with inputs (`htmlFor` + `id`)
❌ Miss `aria-describedby` for error messages
❌ Use inline styles (use CSS Modules + Tailwind)

## Complete TDD Workflow Example

### Step 1: Create Component Structure
```bash
mkdir -p src/components/ui/Card
touch src/components/ui/Card/{index.ts,Card.tsx,Card.module.css,Card.test.tsx}
```

### Step 2: Write Tests First (RED)
```tsx
// Card.test.tsx
import { render, screen } from '@/lib/test-utils';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(<Card variant="outlined">Test</Card>);
    expect(screen.getByText('Test').className).toMatch(/outlined/);
  });
});
```

### Step 3: Run Tests in Watch Mode
```bash
npm run test:watch Card.test.tsx
```

### Step 4: Implement Component (GREEN)
```tsx
// Card.tsx
import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  className?: string;
}

export function Card({ 
  children, 
  variant = 'elevated', 
  className, 
  ...props 
}: CardProps) {
  return (
    <div 
      className={cn(styles.card, styles[variant], className)} 
      {...props}
    >
      {children}
    </div>
  );
}
```

### Step 5: Add CSS Module (GREEN)
```css
/* Card.module.css */
@import "tailwindcss/theme" reference;

.card {
  @apply rounded-lg p-4;
}

.elevated {
  @apply bg-white shadow-md;
}

.outlined {
  @apply bg-white border border-gray-200;
}

.filled {
  @apply bg-gray-50;
}
```

### Step 6: Export from Barrel (GREEN)
```typescript
// index.ts
export { Card } from './Card';
export type { CardProps } from './Card';
```

Update `src/components/ui/index.ts`:
```typescript
export { Card } from './Card';
export type { CardProps } from './Card';
```

### Step 7: Add More Tests (RED → GREEN)
```tsx
it('accepts custom className', () => {
  render(<Card className="custom">Test</Card>);
  expect(screen.getByText('Test')).toHaveClass('custom');
});

it('forwards props to div element', () => {
  render(<Card data-testid="card">Test</Card>);
  expect(screen.getByTestId('card')).toBeInTheDocument();
});
```

### Step 8: Verify Coverage
```bash
npm run test:coverage
```

Expected output should show 90%+ coverage for all metrics.

## Development Commands

```bash
npm run dev           # Start Next.js (Turbopack enabled)
npm run build         # Production build
npm run lint          # ESLint check
```

## Files to Check Before Creating Components

1. `src/components/ui/Button/` - Reference implementation
2. `src/components/ui/Input/` - Example with labels/errors
3. `.cursor/rules/design_system_rules.md` - Comprehensive style guide
4. `vitest.config.ts` - Coverage thresholds and test config
5. `README.md` - Project overview (in Spanish)

---

---

## Hexagonal Architecture (Ports & Adapters) — Rules & Conventions (ENGLISH ONLY)

NOTE: All rules, comments and documentation MUST be written in English. This repository enforces English for consistency across the codebase and PRs.

To keep the codebase consistent, testable and maintainable, follow these mandatory rules when you implement a new bounded context (for example `catalog`, `checkout`):

### Mandatory Structure

- **Location**: place each bounded context under `src/core/<Context>/`.
- **Required structure** for every context:

```
src/core/<Context>/
├─ application/                # Use-cases (pure orchestration)
│  ├─ GetXxx.ts               # Use-case implementation
│  └─ GetXxx.test.ts          # Tests (TDD - write FIRST)
├─ domain/                     # Entities and ports (interfaces)
│  ├─ Product.ts              # Domain entity
│  └─ ProductRepository.ts    # Interface / Port
├─ infrastructure/             # Adapters (controllers, repositories, mappers)
│  ├─ controllers/
│  │  └─ CatalogController.ts
│  ├─ repositories/
│  │  ├─ ApiProductRepository.ts
│  │  └─ InMemoryProductRepository.ts
│  └─ mappers/
│     └─ ProductMapper.ts
├─ Dependencies.ts             # Composition root (wiring) - CamelCase file name
└─ index.ts                    # Barrel export for the context
```

### File Naming

- Use **CamelCase** for all TypeScript files (e.g. `GetProduct.ts`, `ProductRepository.ts`, `Dependencies.ts`, `ProductMapper.ts`).
- **NEVER** create files that differ only by casing (e.g. `Dependencies.ts` vs `dependencies.ts`) — this causes TypeScript and CI problems on case-insensitive filesystems.

### Separation of Concerns

- **`domain/`**: contain ONLY types, entities and ports (interfaces). No I/O or infrastructure references.
  ```typescript
  // domain/ProductRepository.ts
  export interface ProductRepository {
    findById(id: string): Promise<Product | null>;
  }
  ```

- **`application/`**: pure use-cases (orchestration of domain). Write tests for use-cases FIRST (TDD) before implementation.
  ```typescript
  // application/GetProduct.ts
  export class GetProduct {
    constructor(private repo: ProductRepository) {}
    
    async execute(id: string): Promise<Product | null> {
      if (!id || id.trim() === '') {
        throw new Error('Product ID is required');
      }
      return this.repo.findById(id.trim());
    }
  }
  ```

- **`infrastructure/`**: adapters (HTTP controllers, DB or API repositories, mappers, clients).
  ```typescript
  // infrastructure/repositories/ApiProductRepository.ts
  export class ApiProductRepository implements ProductRepository {
    async findById(id: string): Promise<Product | null> {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      return mapExternalToProduct(data);
    }
  }
  ```

- **`Dependencies.ts`**: the SINGLE place to instantiate concrete implementations and compose controllers/use-cases. Do not instantiate infrastructure inside `domain`.
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

### Controllers

Controllers live under `infrastructure/controllers/`. **Prefer injecting use-cases into controllers** instead of injecting repositories and creating use-cases inside the controller.

**Recommended wiring**:

```typescript
// ✅ GOOD: Controller receives use-case
export class CatalogController {
  constructor(private getProductUseCase: GetProduct) {}
  
  async getProduct(id: string): Promise<Product | null> {
    return this.getProductUseCase.execute(id);
  }
}

// Dependencies.ts wiring:
const getProduct = new GetProduct(apiRepo);
const controller = new CatalogController(getProduct);
```

**Anti-pattern**:

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

### Mappers

Transformations between external shapes (API responses) and domain models must live under `infrastructure/mappers/` and be used by infrastructure repositories.

```typescript
// infrastructure/mappers/ProductMapper.ts
export function mapExternalToProduct(external: ExternalProductDTO): Product {
  return {
    id: external.productId,
    name: external.productName,
    priceCents: external.price * 100,
  };
}

// Usage in repository:
// infrastructure/repositories/ApiProductRepository.ts
async findById(id: string): Promise<Product | null> {
  const response = await fetch(`/api/products/${id}`);
  const external = await response.json();
  return mapExternalToProduct(external); // Transform to domain model
}
```

### HTTP/Clients

- **Do NOT** call `fetch` directly from `domain`.
- Use an HTTP wrapper or an injectable client from `infrastructure` and convert responses into domain types via mappers.
- Consider injecting an `HttpClient` for testability.

```typescript
// infrastructure/clients/HttpClient.ts
export interface HttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, body: unknown): Promise<T>;
}

// infrastructure/repositories/ApiProductRepository.ts
export class ApiProductRepository implements ProductRepository {
  constructor(private httpClient: HttpClient) {}
  
  async findById(id: string): Promise<Product | null> {
    const external = await this.httpClient.get<ExternalProductDTO>(`/api/products/${id}`);
    return mapExternalToProduct(external);
  }
}
```

### Tests and TDD

Follow repository rules — **write tests BEFORE implementing code**. For use-cases:

1. **Create test file first**: `GetProduct.test.ts` next to the use-case in `application/`
2. **Write failing tests** (RED phase)
3. **Run tests in watch mode**: `npm run test:watch`
4. **Mock `ProductRepository`** with `vi.fn()` or use `InMemoryProductRepository` for unit tests
5. **Implement minimal code** to pass tests (GREEN phase)
6. **Refactor** while keeping tests green (REFACTOR phase)
7. **Cover all scenarios**: happy path, null/empty results, error handling

```typescript
// application/GetProduct.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetProduct } from './GetProduct';
import type { ProductRepository } from '../domain/ProductRepository';

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

  it('should return product when found', async () => {
    const mockProduct = { id: '1', name: 'Test', priceCents: 9999 };
    vi.mocked(mockRepo.findById).mockResolvedValue(mockProduct);

    const result = await useCase.execute('1');

    expect(result).toEqual(mockProduct);
    expect(mockRepo.findById).toHaveBeenCalledWith('1');
  });

  it('should return null when not found', async () => {
    vi.mocked(mockRepo.findById).mockResolvedValue(null);

    const result = await useCase.execute('999');

    expect(result).toBeNull();
  });

  it('should throw error for empty id', async () => {
    await expect(useCase.execute('')).rejects.toThrow('Product ID is required');
    expect(mockRepo.findById).not.toHaveBeenCalled();
  });

  it('should trim whitespace from id', async () => {
    vi.mocked(mockRepo.findById).mockResolvedValue(null);

    await useCase.execute('  product-123  ');

    expect(mockRepo.findById).toHaveBeenCalledWith('product-123');
  });
});
```

**Coverage requirements** (enforced in `vitest.config.ts`):
- Branches: 90%
- Functions: 90%
- Lines: 90%
- Statements: 90%

### Wiring & Flexibility

Export the default wiring object from `Dependencies.ts` (e.g. `CatalogDependencies`) **AND** also export concrete implementations (`apiRepo`, `inMemoryRepo`) so tests can swap implementations easily.

```typescript
// Dependencies.ts
export const CatalogDependencies = { /* ... */ };

// Also export individual parts
export { apiRepo, inMemoryRepo, getProductUseCase };

// Tests can now use:
import { inMemoryRepo } from '@/core/catalog';
const testUseCase = new GetProduct(inMemoryRepo);
```

### Barrel Exports

Add an `index.ts` barrel in the context root to export the public API of the bounded context. Keep `domain` minimal and focused on core types.

```typescript
// index.ts
export * from './domain/Product';
export * from './domain/ProductRepository';
export * from './application/GetProduct';
export * from './infrastructure/repositories/InMemoryProductRepository';
export * from './infrastructure/repositories/ApiProductRepository';
export * from './Dependencies';
```

### Example: Complete Catalog Context

See `src/core/catalog/` for a reference implementation:

- ✅ Clean separation of layers (domain/application/infrastructure)
- ✅ Use-case with comprehensive tests (`GetProduct.test.ts`)
- ✅ Typed dependencies object (`CatalogDependenciesType`)
- ✅ Controller receives use-case injection (not repository)
- ✅ Mappers for external data transformation
- ✅ In-memory repository for testing
- ✅ Barrel exports in `index.ts`

### Quick Checklist

When creating a new bounded context:

- [ ] Create folder structure: `application/`, `domain/`, `infrastructure/`
- [ ] Define domain entities and repository interfaces (ports)
- [ ] Write use-case tests FIRST (TDD)
- [ ] Implement use-cases with error handling
- [ ] Create infrastructure adapters (repositories, controllers)
- [ ] Add mappers for external data transformations
- [ ] Wire everything in `Dependencies.ts` with TypeScript types
- [ ] Export public API via `index.ts`
- [ ] Run tests and achieve 90%+ coverage
- [ ] Document in English (code comments, READMEs)

### Anti-Patterns to Avoid

❌ Creating use-cases inside controllers  
❌ Calling `fetch` from domain layer  
❌ Instantiating infrastructure inside domain  
❌ Skipping tests or writing them after implementation  
❌ Case-only filename variations (`Dependencies.ts` vs `dependencies.ts`)  
❌ Hardcoding dependencies instead of injecting  
❌ Placing mappers outside `infrastructure/mappers/`  
❌ Missing error validation in use-cases  
❌ Not exporting individual parts from Dependencies for testing  

---

**For detailed examples and best practices, see `src/core/README.md`.**

