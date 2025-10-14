# Component Visual Examples

## Navbar Component

### Desktop View
```
┌─────────────────────────────────────────────────────────────────────────┐
│  Luxe    [🔍 Search products...]              👤 User    🛒 Cart (3)   │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Fixed position at top of page
- Brand name on the left
- Centered search bar (expands to max-width: 600px)
- User and cart icons on the right
- Cart badge shows item count when > 0

### Mobile/Responsive
```
┌────────────────────────────────┐
│  Luxe  [🔍]    👤    🛒 (3)   │
└────────────────────────────────┘
```

## Cart Component

### With Items
```
┌───────────────────────────────────────────────┐
│  Shopping Cart                                 │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ [img] Premium Headphones      [-] 2 [+]  │ │
│  │       $299.99                       [×]   │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ [img] Smart Watch Pro         [-] 1 [+]  │ │
│  │       $399.99                       [×]   │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  ─────────────────────────────────────────── │
│                                                │
│  Subtotal:                           $999.97  │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │              CHECKOUT                     │ │
│  └──────────────────────────────────────────┘ │
└───────────────────────────────────────────────┘
```

### Empty State
```
┌───────────────────────────────────────────────┐
│  Shopping Cart                                 │
│                                                │
│              🛒                                │
│                                                │
│         Your cart is empty                     │
│                                                │
│  ─────────────────────────────────────────── │
│                                                │
│  Subtotal:                            $0.00   │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │          CHECKOUT (disabled)              │ │
│  └──────────────────────────────────────────┘ │
└───────────────────────────────────────────────┘
```

## Color Scheme

Based on design tokens:

### Navbar
- Background: neutral-50 (#f9fafb)
- Border: neutral-200 (#e5e7eb)
- Brand: primary-600 (#2563eb)
- Search input border: neutral-300 (#d1d5db)
- Search focus: primary-500 (#3b82f6)
- Cart badge: error-500 (red)

### Cart
- Background: neutral-50 (#ffffff)
- Item border: neutral-200 (#e5e7eb)
- Text primary: neutral-900 (#111827)
- Text secondary: neutral-600 (#4b5563)
- Empty icon: neutral-300 (#d1d5db)
- Checkout button: primary-500 (#3b82f6)

## Interaction States

### Navbar
1. **Search Input**
   - Default: Light border
   - Focus: Blue border + blue shadow
   - Typing: Updates search query in real-time

2. **User Button**
   - Hover: Light background
   - Active: Darker background
   - Focus: Blue ring

3. **Cart Button**
   - Hover: Light background
   - Active: Darker background
   - Focus: Blue ring
   - Badge: Always visible when count > 0

### Cart
1. **Quantity Controls**
   - Decrease disabled when quantity = 1
   - Both buttons have hover states
   - Immediate visual feedback

2. **Remove Button**
   - Hover: Darker color
   - Focus: Blue ring
   - Removes item from list

3. **Checkout Button**
   - Enabled: Blue with hover effect
   - Disabled: Grayed out (cart empty)
   - Focus: Blue ring

## Responsive Behavior

### Navbar Breakpoints
- **Desktop (≥768px)**
  - Full layout with expanded search
  - Brand name visible
  - Icons with labels
  
- **Mobile (<768px)**
  - Compact layout
  - Search bar takes available space
  - Icons without text labels

### Cart Layout
- Fixed width: 600px max
- Scrollable items list (max-height: 400px)
- Always shows summary at bottom
- Adapts to parent container

## Animation & Transitions

All components use smooth transitions:
- Border color: 0.2s
- Background: 0.2s
- Box-shadow: 0.2s
- Color changes: 0.2s

## Integration Example

```tsx
'use client';

import { useState } from 'react';
import { Navbar, Cart, CartItem } from '@/components/ui';

export default function ShopLayout({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <>
      <Navbar
        brandName="My Shop"
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(!cartOpen)}
        onSearchSubmit={(query) => {
          // Handle search
        }}
      />
      
      <div style={{ display: 'flex' }}>
        <main style={{ flex: 1 }}>
          {children}
        </main>
        
        {cartOpen && (
          <aside style={{ width: '400px', padding: '1rem' }}>
            <Cart
              items={cartItems}
              onQuantityChange={(id, qty) => {
                setCartItems(items =>
                  items.map(item =>
                    item.id === id ? { ...item, quantity: qty } : item
                  )
                );
              }}
              onRemove={(id) => {
                setCartItems(items => items.filter(item => item.id !== id));
              }}
              onCheckout={() => {
                // Navigate to checkout
              }}
            />
          </aside>
        )}
      </div>
    </>
  );
}
```
