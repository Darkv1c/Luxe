# Luxe Design System

Design system developed with **Test-Driven Development (TDD)** using modern best practices.

## 🚨 Mandatory TDD Workflow

**CRITICAL**: All components MUST be developed following TDD:

1. **RED**: Write failing tests
2. **GREEN**: Implement minimal code to make tests pass
3. **REFACTOR**: Improve the code while keeping tests green

## 🛠 Technology Stack

### Core
- **React 19.1.0** con TypeScript
- **Next.js 15.5.5** con App Router y Turbopack
- **CSS Modules** para estilos modulares
- **Tailwind CSS 4.0** para utilidades

### Testing
- **Vitest** como test runner (más rápido que Jest)
- **React Testing Library** para testing de componentes
- **jsdom** para environment DOM
- **@testing-library/jest-dom** para matchers adicionales

### Desarrollo
- **ESLint** para linting
- **TypeScript** con modo strict
- **Autoprefixer** para compatibilidad CSS

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
├── components/             # Componentes UI
│   ├── ui/                # Componentes base (Button, Input, etc.)
│   │   └── Button/        # Ejemplo de estructura de componente
│   │       ├── index.ts           # Export barrel
│   │       ├── Button.tsx         # Implementación del componente
│   │       ├── Button.module.css  # Estilos CSS Modules
│   │       └── Button.test.tsx    # Tests (OBLIGATORIO)
│   ├── forms/             # Componentes de formularios
│   └── layout/            # Componentes de layout
├── lib/                   # Utilidades y helpers
│   ├── tokens/            # Design tokens
│   ├── utils/             # Funciones utilitarias
│   └── test-utils/        # Utilidades para testing
├── hooks/                 # Custom React hooks
├── types/                 # Definiciones TypeScript
└── __tests__/             # Tests globales
```

## 🎨 CSS Modules + Tailwind

### Configuración
Los CSS Modules están configurados para funcionar con Tailwind CSS 4.0:

```css
/* Button.module.css */
@import "tailwindcss/theme" reference;

.button {
  @apply inline-flex items-center justify-center rounded-md font-medium;
  @apply transition-colors duration-200;
}

.primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}
```

### Uso en Componentes
```tsx
import styles from './Button.module.css';
import { cn } from '@/lib/utils';

export function Button({ variant = 'primary', className, ...props }) {
  return (
    <button
      className={cn(styles.button, styles[variant], className)}
      {...props}
    />
  );
}
```

## 🧪 Testing con TDD

### Comandos Disponibles
```bash
npm run test          # Ejecutar tests una vez
npm run test:watch    # Ejecutar tests en modo watch
npm run test:ui       # Abrir interfaz visual de Vitest
npm run test:coverage # Ejecutar con reporte de cobertura
```

### Estructura de Tests
```tsx
// Button.test.tsx
import { render, screen } from '@/lib/test-utils';
```markdown
# Luxe Design System

Design system developed with **Test-Driven Development (TDD)** using modern best practices.

## 🚨 Mandatory TDD Workflow

**CRITICAL**: All components MUST be developed following TDD:

1. **RED**: Write failing tests
2. **GREEN**: Implement minimal code to make tests pass
3. **REFACTOR**: Improve the code while keeping tests green

## 🛠 Technology Stack

### Core
- **React 19.1.0** with TypeScript
- **Next.js 15.5.5** with App Router and Turbopack
- **CSS Modules** for modular styles
- **Tailwind CSS 4.0** for utility classes

### Testing
- **Vitest** as the test runner
- **React Testing Library** for component testing
- **jsdom** as the DOM environment
- **@testing-library/jest-dom** for additional matchers

### Development
- **ESLint** for linting
- **TypeScript** in strict mode
- **Autoprefixer** for CSS compatibility

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/             # UI components
│   ├── ui/                # Base components (Button, Input, etc.)
│   │   └── Button/        # Example component structure
│   │       ├── index.ts           # Barrel export
│   │       ├── Button.tsx         # Component implementation
│   │       ├── Button.module.css  # CSS Modules styles
│   │       └── Button.test.tsx    # Tests (MANDATORY)
│   ├── forms/             # Form components
│   └── layout/            # Layout components
├── lib/                   # Utilities and helpers
│   ├── tokens/            # Design tokens
│   ├── utils/             # Utility functions
│   └── test-utils/        # Testing utilities
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript definitions
└── __tests__/             # Global tests
```

## 🎨 CSS Modules + Tailwind

### Configuration
CSS Modules are configured to work with Tailwind CSS 4.0:

```css
/* Button.module.css */
@import "tailwindcss/theme" reference;

.button {
  @apply inline-flex items-center justify-center rounded-md font-medium;
  @apply transition-colors duration-200;
}

.primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}
```

### Usage in Components
```tsx
import styles from './Button.module.css';
import { cn } from '@/lib/utils';

export function Button({ variant = 'primary', className, ...props }) {
  return (
    <button
      className={cn(styles.button, styles[variant], className)}
      {...props}
    />
  );
}
```

## 🧪 Testing with TDD

### Available Commands
```bash
npm run test          # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:ui       # Open Vitest UI
npm run test:coverage # Run tests with coverage report
```

### Test Structure
```tsx
// Button.test.tsx
import { render, screen } from '@/lib/test-utils';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Coverage Requirements
- **90% minimum** on branches, functions, lines, statements
- All component variants must be tested
- All user interactions must be tested
- All CSS classes should be verified

## 🎯 Design Tokens

### Colors
```typescript
// src/lib/tokens/colors.ts
export const colors = {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    900: '#1e3a8a'
  },
  neutral: {
    50: '#f9fafb',
    500: '#6b7280',
    900: '#111827'
  }
} as const;
```

### Spacing and Typography
```typescript
// src/lib/tokens/spacing.ts
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem'
} as const;
```


## 📋 TDD Development Workflow

### 1. Planning
- Analyze Figma designs
- Extract design tokens
- Define component props and variants

### 2. TDD Phase (MANDATORY)
```bash
# 1. Create component structure
mkdir src/components/ui/NewComponent
touch src/components/ui/NewComponent/{index.ts,NewComponent.tsx,NewComponent.module.css,NewComponent.test.tsx}

# 2. Write failing test (RED)
npm run test:watch NewComponent.test.tsx

# 3. Implement minimal code (GREEN)
# 4. Refactor and improve (REFACTOR)
# 5. Repeat until feature is complete
```

### 3. Integration
- Export from index files
- Update documentation
- Verify test coverage

## 🚀 Development Commands

```bash
# Development
npm run dev           # Start development server
npm run build         # Production build
npm run start         # Start production server

# Testing
npm run test          # Run tests
npm run test:watch    # Tests in watch mode
npm run test:ui       # Test UI
npm run test:coverage # Coverage report

# Linting
npm run lint          # Run ESLint
```

## 📦 Available Components

### ✅ Button
- **Variants**: primary, secondary, outline
- **Sizes**: sm, md, lg
- **States**: disabled, loading
- **Tests**: 7 tests, 100% coverage
- **Location**: `src/components/ui/Button/`

### 🔄 Upcoming Components (TDD)
- [ ] Input/TextField
- [ ] Card
- [ ] Modal/Dialog
- [ ] Dropdown/Select
- [ ] Checkbox
- [ ] Radio Button

## 🎨 Figma Integration

### Design Tokens
- Use Figma variables for colors, spacing, typography
- Map Figma tokens to CSS custom properties
- Keep consistency between design and code

### Components
- Each Figma component should have a corresponding React component
- Use Figma Auto Layout to guide CSS Grid/Flexbox implementation
- Keep naming and hierarchy conventions consistent

## ♿ Accessibility

- All components must be keyboard navigable
- Use appropriate ARIA labels and roles
- WCAG AA compliance for color contrast
- Screen reader compatibility
- Proper focus management

## 📝 Code Standards

### TypeScript
- Strict mode enabled
- Explicit types for public APIs
- Proper interfaces for props

### Git Workflow
- Feature branches for new components
- PR reviews are required
- All tests must pass before merge
- No commits without tests

---


## 🎉 Current Status

✅ **Base setup complete**
- Vitest + React Testing Library configured
- CSS Modules + Tailwind CSS working
- TypeScript with strict types
- Design tokens defined
- Folder structure established

✅ **First component (Button)**
- Developed using TDD
- 7 tests passing
- 3 variants (primary, secondary, outline)
- 3 sizes (sm, md, lg)
- States: disabled and interactive
- CSS Modules with scoped classes

**🚨 Reminder: NO COMPONENTS WILL BE ACCEPTED WITHOUT TESTS. TDD IS MANDATORY.**
```
