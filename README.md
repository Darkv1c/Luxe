# Luxe Design System

Sistema de diseño desarrollado con **Test-Driven Development (TDD)** usando las mejores prácticas modernas.

## 🚨 Metodología TDD Obligatoria

**CRÍTICO**: Todos los componentes DEBEN ser desarrollados siguiendo TDD:

1. **RED**: Escribe tests que fallen
2. **GREEN**: Implementa código mínimo para que pasen
3. **REFACTOR**: Mejora el código manteniendo los tests verdes

## 🛠 Stack Tecnológico

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

### Requisitos de Cobertura
- **90% mínimo** en branches, functions, lines, statements
- Todos los variants de componentes deben ser testados
- Todas las interacciones de usuario deben ser testadas
- Todas las clases CSS deben ser verificadas

## 🎯 Design Tokens

### Colores
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

### Spacing y Typography
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

## 📋 Workflow de Desarrollo TDD

### 1. Planificación
- Analizar diseño de Figma
- Extraer design tokens
- Definir props y variants del componente

### 2. Fase TDD (OBLIGATORIA)
```bash
# 1. Crear estructura del componente
mkdir src/components/ui/NewComponent
touch src/components/ui/NewComponent/{index.ts,NewComponent.tsx,NewComponent.module.css,NewComponent.test.tsx}

# 2. Escribir test que falle (RED)
npm run test:watch NewComponent.test.tsx

# 3. Implementar código mínimo (GREEN)
# 4. Refactorizar y mejorar (REFACTOR)
# 5. Repetir hasta completar feature
```

### 3. Integración
- Exportar desde archivos index
- Actualizar documentación
- Verificar cobertura de tests

## 🚀 Comandos de Desarrollo

```bash
# Desarrollo
npm run dev           # Iniciar servidor de desarrollo
npm run build         # Build para producción
npm run start         # Iniciar servidor de producción

# Testing
npm run test          # Ejecutar tests
npm run test:watch    # Tests en modo watch
npm run test:ui       # Interfaz visual de tests
npm run test:coverage # Reporte de cobertura

# Linting
npm run lint          # Ejecutar ESLint
```

## 📦 Componentes Disponibles

### ✅ Button
- **Variants**: primary, secondary, outline
- **Sizes**: sm, md, lg
- **Estados**: disabled, loading
- **Tests**: 7 tests, 100% cobertura
- **Archivo**: `src/components/ui/Button/`

### 🔄 Próximos Componentes (TDD)
- [ ] Input/TextField
- [ ] Card
- [ ] Modal/Dialog
- [ ] Dropdown/Select
- [ ] Checkbox
- [ ] Radio Button

## 🎨 Integración con Figma

### Design Tokens
- Usar variables de Figma para colores, spacing, typography
- Mapear tokens de Figma a CSS custom properties
- Mantener consistencia entre diseño y código

### Componentes
- Cada componente de Figma debe tener su equivalente React
- Usar Auto Layout de Figma para guiar implementación CSS Grid/Flexbox
- Mantener jerarquía y convenciones de naming

## ♿ Accesibilidad

- Todos los componentes deben ser navegables por teclado
- ARIA labels y roles apropiados
- Cumplimiento WCAG AA para contraste de colores
- Compatibilidad con screen readers
- Gestión adecuada del focus

## 📝 Estándares de Código

### TypeScript
- Modo strict habilitado
- Tipos explícitos para APIs públicas
- Interfaces apropiadas para props

### Git Workflow
- Feature branches para nuevos componentes
- Reviews de PRs obligatorios
- Todos los tests deben pasar antes de merge
- No commits sin tests

---

## 🎉 Estado Actual

✅ **Configuración Base Completa**
- Vitest + React Testing Library configurado
- CSS Modules + Tailwind CSS funcionando
- TypeScript con tipos estrictos
- Design tokens definidos
- Estructura de carpetas establecida

✅ **Primer Componente (Button)**
- Desarrollado con TDD
- 7 tests pasando
- 3 variants (primary, secondary, outline)
- 3 sizes (sm, md, lg)
- Estados disabled y interactive
- CSS Modules con clases tipadas

**🚨 Recordatorio: NO SE ACEPTA NINGÚN COMPONENTE SIN TESTS. TDD ES OBLIGATORIO.**
