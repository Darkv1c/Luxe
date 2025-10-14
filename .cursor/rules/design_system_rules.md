# Luxe Design System Rules

## Core Development Principle

**🚨 CRITICAL: ALL components MUST be developed using Test-Driven Development (TDD)**

Every component must follow the TDD cycle:
1. **RED**: Write a failing test first
2. **GREEN**: Write minimal code to make the test pass
3. **REFACTOR**: Clean up the code while keeping tests green

## Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/             # UI components
│   ├── ui/                # Base UI components (buttons, inputs, etc.)
│   ├── forms/             # Form-specific components
│   └── layout/            # Layout components
├── lib/                   # Utilities and helpers
│   ├── tokens/            # Design tokens
│   ├── utils/             # Utility functions
│   └── test-utils/        # Testing utilities
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── __tests__/             # Global test files
```

## Testing Framework

### Vitest + React Testing Library
- **Vitest** for test runner (faster than Jest)
- **React Testing Library** for component testing
- **jsdom** for DOM environment
- **@vitest/ui** for visual test interface

### Test Commands
```bash
npm run test          # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:ui       # Open Vitest UI
npm run test:coverage # Run with coverage report
```

## Styling System

### CSS Modules
- All component styles use CSS Modules
- File naming: `ComponentName.module.css`
- Scoped class names automatically generated
- Type-safe CSS with TypeScript integration

### CSS Module Structure
```css
/* Button.module.css */
.button {
  @apply inline-flex items-center justify-center rounded-md font-medium transition-colors;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2;
}

.primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.secondary {
  @apply bg-gray-200 text-gray-900 hover:bg-gray-300;
}

.small {
  @apply text-sm px-3 py-1.5;
}

.medium {
  @apply text-base px-4 py-2;
}

.large {
  @apply text-lg px-6 py-3;
}
```

## Design Token System

### Location
- Design tokens defined in `src/lib/tokens/`
- Colors, typography, spacing, and other design values
- CSS custom properties with Tailwind integration

### Token Structure
```typescript
// src/lib/tokens/colors.ts
export const colors = {
  primary: {
    50: '#f0f9ff',
    500: '#3b82f6',
    900: '#1e3a8a'
  },
  neutral: {
    50: '#f9fafb',
    500: '#6b7280',
    900: '#111827'
  }
} as const;

// src/lib/tokens/spacing.ts
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
} as const;
```

## Component Architecture

### Framework Stack
- **React 19.1.0** with TypeScript
- **Next.js 15.5.5** with App Router and Turbopack
- **CSS Modules** for component styling
- **Tailwind CSS 4.0** for utility classes
- **Vitest + React Testing Library** for testing

### Component Patterns

#### Base Component Structure
```typescript
// src/components/ui/Button/Button.tsx
import { ReactNode } from 'react';
import styles from './Button.module.css';
import { cn } from '@/lib/utils';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        { [styles.disabled]: disabled },
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
```

#### CSS Module Integration
```css
/* src/components/ui/Button/Button.module.css */
.button {
  @apply inline-flex items-center justify-center rounded-md font-medium;
  @apply transition-colors duration-200;
  @apply focus-visible:outline-none focus-visible:ring-2;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.primary {
  @apply bg-blue-600 text-white;
  @apply hover:bg-blue-700 active:bg-blue-800;
  @apply focus-visible:ring-blue-500;
}

.secondary {
  @apply bg-gray-100 text-gray-900;
  @apply hover:bg-gray-200 active:bg-gray-300;
  @apply focus-visible:ring-gray-500;
}

.outline {
  @apply border border-gray-300 bg-transparent text-gray-700;
  @apply hover:bg-gray-50 active:bg-gray-100;
  @apply focus-visible:ring-gray-500;
}

.sm {
  @apply text-sm px-3 py-1.5 h-8;
}

.md {
  @apply text-base px-4 py-2 h-10;
}

.lg {
  @apply text-lg px-6 py-3 h-12;
}

.disabled {
  @apply opacity-50 cursor-not-allowed pointer-events-none;
}
```

#### Test Structure (TDD MANDATORY)
```typescript
// src/components/ui/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies correct variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(/primary/);
  });

  it('applies correct size styles', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(/lg/);
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass(/disabled/);
  });

  it('accepts custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
```

### File Organization
Each component follows this structure:
```
Button/
├── index.ts              # Export barrel
├── Button.tsx            # Component implementation
├── Button.module.css     # CSS Module styles
├── Button.test.tsx       # Tests (MANDATORY)
├── Button.stories.tsx    # Storybook stories (optional)
└── Button.types.ts       # Type definitions (if complex)
```

## Utility Functions

### CSS Class Name Utility
```typescript
// src/lib/utils/cn.ts
import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

### Test Utilities
```typescript
// src/lib/test-utils/render.tsx
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

const customRender = (ui: ReactElement, options: RenderOptions = {}) => {
  return render(ui, {
    // Add any global providers here
    ...options,
  });
};

export * from '@testing-library/react';
export { customRender as render };
```

## Asset Management

### Icons
- Store SVG icons in `src/components/icons/`
- Create React components for each icon
- Use CSS Modules for icon styling

```typescript
// src/components/icons/ChevronDownIcon.tsx
import styles from './Icons.module.css';

export function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={`${styles.icon} ${className}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );
}
```

## Testing Requirements (TDD ENFORCED)

### Coverage Requirements
- Minimum 90% test coverage for all components
- All user interactions must be tested
- All component variants must be tested
- All CSS classes must be verified in tests

### Test File Naming
- Component tests: `ComponentName.test.tsx`
- Utility tests: `utilityName.test.ts`
- Integration tests: `feature.integration.test.tsx`

## Component Development Workflow (TDD)

### 1. Planning Phase
- Analyze Figma design
- Extract design tokens (colors, spacing, typography)
- Define component props and variants
- Plan CSS Module structure

### 2. TDD Phase (MANDATORY)
```bash
# Step 1: Create test file first
touch src/components/ui/Button/Button.test.tsx

# Step 2: Write failing test
npm run test:watch Button.test.tsx

# Step 3: Create CSS Module
touch src/components/ui/Button/Button.module.css

# Step 4: Implement minimal component to pass tests
# Step 5: Refactor and improve
# Step 6: Repeat until feature complete
```

### 3. Integration Phase
- Export component from index files
- Add to Storybook (if applicable)
- Update documentation

## TypeScript Configuration

### CSS Module Types
Add to `src/types/global.d.ts`:
```typescript
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

## Accessibility Requirements

- All components must be keyboard navigable
- Proper ARIA labels and roles
- Color contrast compliance (WCAG AA)
- Screen reader compatibility
- Focus management with visible indicators

## Performance Guidelines

- Use React.memo for expensive components
- Implement proper key props for lists
- Lazy load non-critical components
- CSS Modules provide automatic code splitting

---

**Remember: NO COMPONENT IS COMPLETE WITHOUT COMPREHENSIVE TESTS. TDD IS NOT OPTIONAL.**