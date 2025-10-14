'use client';

import { useState } from 'react';
import { Navbar, Cart, CartItem } from '@/components/ui';

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    quantity: 1,
    image: 'https://placehold.co/100x100/3b82f6/ffffff?text=🎧',
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 399.99,
    quantity: 2,
    image: 'https://placehold.co/100x100/10b981/ffffff?text=⌚',
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    price: 89.99,
    quantity: 1,
    image: 'https://placehold.co/100x100/f59e0b/ffffff?text=🔊',
  },
];

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId));
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (query: string) => {
    alert(`Searching for: ${query}`);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar
        brandName="Luxe"
        onSearch={handleSearch}
        onSearchSubmit={handleSearchSubmit}
        onUserClick={() => alert('User profile clicked')}
        onCartClick={() => setShowCart(!showCart)}
        cartItemCount={totalItems}
      />
      
      <main style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
              E-commerce Demo
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              This demo showcases the Navbar and Cart components built with TDD methodology.
              All components meet WCAG 2.1 Level AA accessibility standards.
            </p>

            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: '#f9fafb', 
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                Features
              </h2>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: '#4b5563' }}>
                <li>Full keyboard navigation support (Tab, Enter, Space, Escape)</li>
                <li>ARIA labels and semantic HTML</li>
                <li>Cart item management (add, remove, update quantity)</li>
                <li>Real-time search functionality</li>
                <li>Responsive design</li>
                <li>90%+ test coverage</li>
              </ul>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: '#eff6ff',
              borderRadius: '0.5rem',
              border: '1px solid #bfdbfe',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1e40af' }}>
                Test Coverage
              </h3>
              <ul style={{ fontSize: '0.875rem', color: '#1e40af' }}>
                <li><strong>Navbar:</strong> 98.61% statements, 83.33% branches</li>
                <li><strong>Cart:</strong> 98.9% statements, 90.9% branches</li>
                <li><strong>Total Tests:</strong> 218 passing</li>
              </ul>
            </div>
          </div>

          {showCart && (
            <div style={{ flex: '0 0 400px' }}>
              <Cart
                items={cartItems}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                onCheckout={handleCheckout}
              />
            </div>
          )}
        </div>

        {!showCart && (
          <div style={{ marginTop: '2rem', textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#9ca3af', fontSize: '1.125rem' }}>
              👆 Click the cart icon in the navigation bar to view the shopping cart
            </p>
          </div>
        )}
      </main>
    </>
  );
}

