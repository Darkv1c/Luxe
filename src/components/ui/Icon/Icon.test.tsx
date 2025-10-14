import { render, screen } from '@/lib/test-utils';
import { describe, it, expect } from 'vitest';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders heart icon correctly', () => {
    render(<Icon name="heart" data-testid="heart-icon" />);
    const icon = screen.getByTestId('heart-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName).toBe('svg');
  });

  it('renders star icon correctly', () => {
    render(<Icon name="star" data-testid="star-icon" />);
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
  });

  it('renders user icon correctly', () => {
    render(<Icon name="user" data-testid="user-icon" />);
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });

  it('renders shopping-cart icon correctly', () => {
    render(<Icon name="shopping-cart" data-testid="cart-icon" />);
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
  });

  it('renders search icon correctly', () => {
    render(<Icon name="search" data-testid="search-icon" />);
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('renders chevron-down icon correctly', () => {
    render(<Icon name="chevron-down" data-testid="chevron-icon" />);
    expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
  });

  it('renders filter icon correctly', () => {
    render(<Icon name="filter" data-testid="filter-icon" />);
    expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
  });

  it('applies custom size', () => {
    render(<Icon name="heart" size={32} data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');
  });

  it('uses default size of 24', () => {
    render(<Icon name="heart" data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
  });

  it('applies custom className', () => {
    render(<Icon name="heart" className="custom-icon" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('custom-icon');
  });

  it('applies custom color', () => {
    render(<Icon name="heart" color="#ff0000" data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('stroke', '#ff0000');
  });

  it('applies filled variant', () => {
    render(<Icon name="heart" filled data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    const path = icon.querySelector('path');
    expect(path).toHaveAttribute('fill', 'currentColor');
  });

  it('has aria-hidden by default for decorative icons', () => {
    render(<Icon name="heart" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('accepts aria-label for accessible icons', () => {
    render(<Icon name="heart" aria-label="Favorite" data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('aria-label', 'Favorite');
    expect(icon).not.toHaveAttribute('aria-hidden');
  });
});
