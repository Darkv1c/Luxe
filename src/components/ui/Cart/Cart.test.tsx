import { render, screen } from '@/lib/test-utils';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Cart } from './Cart';

describe('Cart', () => {
  const mockItems = [
    {
      id: '1',
      name: 'Product 1',
      price: 29.99,
      quantity: 2,
      image: '/product1.jpg',
    },
    {
      id: '2',
      name: 'Product 2',
      price: 49.99,
      quantity: 1,
      image: '/product2.jpg',
    },
  ];

  it('renders cart title', () => {
    render(<Cart items={[]} />);
    expect(screen.getByText(/shopping cart/i)).toBeInTheDocument();
  });

  it('displays empty state when no items', () => {
    render(<Cart items={[]} />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('renders cart items', () => {
    render(<Cart items={mockItems} />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('displays item quantities', () => {
    render(<Cart items={mockItems} />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('displays item prices', () => {
    render(<Cart items={mockItems} />);
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
  });

  it('calculates and displays subtotal', () => {
    render(<Cart items={mockItems} />);
    // 2 * 29.99 + 1 * 49.99 = 109.97
    expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
    expect(screen.getByText('$109.97')).toBeInTheDocument();
  });

  it('handles quantity increase', async () => {
    const user = userEvent.setup();
    const handleQuantityChange = vi.fn();
    render(<Cart items={mockItems} onQuantityChange={handleQuantityChange} />);
    
    const increaseButtons = screen.getAllByRole('button', { name: /increase quantity/i });
    await user.click(increaseButtons[0]);
    
    expect(handleQuantityChange).toHaveBeenCalledWith('1', 3);
  });

  it('handles quantity decrease', async () => {
    const user = userEvent.setup();
    const handleQuantityChange = vi.fn();
    render(<Cart items={mockItems} onQuantityChange={handleQuantityChange} />);
    
    const decreaseButtons = screen.getAllByRole('button', { name: /decrease quantity/i });
    await user.click(decreaseButtons[0]);
    
    expect(handleQuantityChange).toHaveBeenCalledWith('1', 1);
  });

  it('handles item removal', async () => {
    const user = userEvent.setup();
    const handleRemove = vi.fn();
    render(<Cart items={mockItems} onRemove={handleRemove} />);
    
    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    await user.click(removeButtons[0]);
    
    expect(handleRemove).toHaveBeenCalledWith('1');
  });

  it('handles checkout click', async () => {
    const user = userEvent.setup();
    const handleCheckout = vi.fn();
    render(<Cart items={mockItems} onCheckout={handleCheckout} />);
    
    await user.click(screen.getByRole('button', { name: /checkout/i }));
    expect(handleCheckout).toHaveBeenCalledTimes(1);
  });

  it('disables checkout button when cart is empty', () => {
    render(<Cart items={[]} />);
    const checkoutButton = screen.getByRole('button', { name: /checkout/i });
    expect(checkoutButton).toBeDisabled();
  });

  it('accepts custom className', () => {
    const { container } = render(<Cart items={[]} className="custom-cart" />);
    expect(container.firstChild).toHaveClass('custom-cart');
  });

  it('displays item images when provided', () => {
    render(<Cart items={mockItems} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('alt', 'Product 1');
  });

  it('does not decrease quantity below 1', () => {
    const handleQuantityChange = vi.fn();
    const singleItem = [{ ...mockItems[1], quantity: 1 }];
    render(<Cart items={singleItem} onQuantityChange={handleQuantityChange} />);
    
    const decreaseButton = screen.getByRole('button', { name: /decrease quantity/i });
    
    // Button should be disabled when quantity is 1
    expect(decreaseButton).toBeDisabled();
  });
});

describe('Cart - Keyboard Navigation', () => {
  const mockItems = [
    {
      id: '1',
      name: 'Product 1',
      price: 29.99,
      quantity: 2,
      image: '/product1.jpg',
    },
  ];

  it('should be able to tab through all interactive elements', async () => {
    const user = userEvent.setup();
    render(<Cart items={mockItems} />);
    
    // Should be able to tab through decrease, increase, remove, and checkout buttons
    await user.tab();
    expect(screen.getByRole('button', { name: /decrease quantity/i })).toHaveFocus();
    
    await user.tab();
    expect(screen.getByRole('button', { name: /increase quantity/i })).toHaveFocus();
    
    await user.tab();
    expect(screen.getByRole('button', { name: /remove/i })).toHaveFocus();
    
    await user.tab();
    expect(screen.getByRole('button', { name: /checkout/i })).toHaveFocus();
  });

  it('should activate buttons with Enter key', async () => {
    const user = userEvent.setup();
    const handleQuantityChange = vi.fn();
    render(<Cart items={mockItems} onQuantityChange={handleQuantityChange} />);
    
    const increaseButton = screen.getByRole('button', { name: /increase quantity/i });
    increaseButton.focus();
    await user.keyboard('{Enter}');
    
    expect(handleQuantityChange).toHaveBeenCalledWith('1', 3);
  });

  it('should activate buttons with Space key', async () => {
    const user = userEvent.setup();
    const handleRemove = vi.fn();
    render(<Cart items={mockItems} onRemove={handleRemove} />);
    
    const removeButton = screen.getByRole('button', { name: /remove/i });
    removeButton.focus();
    await user.keyboard(' ');
    
    expect(handleRemove).toHaveBeenCalledWith('1');
  });
});

describe('Cart - Accessibility', () => {
  const mockItems = [
    {
      id: '1',
      name: 'Product 1',
      price: 29.99,
      quantity: 2,
      image: '/product1.jpg',
    },
  ];

  it('should have accessible button labels', () => {
    render(<Cart items={mockItems} />);
    expect(screen.getByRole('button', { name: /decrease quantity/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /increase quantity/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument();
  });

  it('should have alt text for product images', () => {
    render(<Cart items={mockItems} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Product 1');
  });

  it('should indicate disabled state for checkout button', () => {
    render(<Cart items={[]} />);
    const checkoutButton = screen.getByRole('button', { name: /checkout/i });
    expect(checkoutButton).toBeDisabled();
    expect(checkoutButton).toHaveAttribute('disabled');
  });
});
