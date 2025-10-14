import { render, screen } from '@/lib/test-utils';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders the navbar element', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders logo/brand name', () => {
    render(<Navbar brandName="Luxe" />);
    expect(screen.getByText('Luxe')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<Navbar />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders user icon button', () => {
    render(<Navbar />);
    expect(screen.getByRole('button', { name: /user/i })).toBeInTheDocument();
  });

  it('renders cart icon button', () => {
    render(<Navbar />);
    expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument();
  });

  it('handles search input changes', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();
    render(<Navbar onSearch={handleSearch} />);
    
    const searchInput = screen.getByRole('searchbox');
    await user.type(searchInput, 'test query');
    
    expect(searchInput).toHaveValue('test query');
  });

  it('calls onSearchSubmit when search is submitted', async () => {
    const user = userEvent.setup();
    const handleSearchSubmit = vi.fn();
    render(<Navbar onSearchSubmit={handleSearchSubmit} />);
    
    const searchInput = screen.getByRole('searchbox');
    await user.type(searchInput, 'test query{Enter}');
    
    expect(handleSearchSubmit).toHaveBeenCalledWith('test query');
  });

  it('handles user icon click', async () => {
    const user = userEvent.setup();
    const handleUserClick = vi.fn();
    render(<Navbar onUserClick={handleUserClick} />);
    
    await user.click(screen.getByRole('button', { name: /user/i }));
    expect(handleUserClick).toHaveBeenCalledTimes(1);
  });

  it('handles cart icon click', async () => {
    const user = userEvent.setup();
    const handleCartClick = vi.fn();
    render(<Navbar onCartClick={handleCartClick} />);
    
    await user.click(screen.getByRole('button', { name: /cart/i }));
    expect(handleCartClick).toHaveBeenCalledTimes(1);
  });

  it('accepts custom className', () => {
    render(<Navbar className="custom-navbar" />);
    expect(screen.getByRole('navigation')).toHaveClass('custom-navbar');
  });

  it('displays cart item count when provided', () => {
    render(<Navbar cartItemCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('does not display cart badge when count is 0', () => {
    render(<Navbar cartItemCount={0} />);
    const badge = screen.queryByText('0');
    expect(badge).not.toBeInTheDocument();
  });
});

describe('Navbar - Keyboard Navigation', () => {
  it('should be able to tab through all interactive elements', async () => {
    const user = userEvent.setup();
    render(<Navbar brandName="Luxe" />);
    
    await user.tab();
    expect(screen.getByRole('searchbox')).toHaveFocus();
    
    await user.tab();
    expect(screen.getByRole('button', { name: /user/i })).toHaveFocus();
    
    await user.tab();
    expect(screen.getByRole('button', { name: /cart/i })).toHaveFocus();
  });

  it('should submit search with Enter key', async () => {
    const user = userEvent.setup();
    const handleSearchSubmit = vi.fn();
    render(<Navbar onSearchSubmit={handleSearchSubmit} />);
    
    const searchInput = screen.getByRole('searchbox');
    searchInput.focus();
    await user.keyboard('search term{Enter}');
    
    expect(handleSearchSubmit).toHaveBeenCalledWith('search term');
  });

  it('should activate user button with Enter key', async () => {
    const user = userEvent.setup();
    const handleUserClick = vi.fn();
    render(<Navbar onUserClick={handleUserClick} />);
    
    const userButton = screen.getByRole('button', { name: /user/i });
    userButton.focus();
    await user.keyboard('{Enter}');
    
    expect(handleUserClick).toHaveBeenCalledTimes(1);
  });

  it('should activate cart button with Space key', async () => {
    const user = userEvent.setup();
    const handleCartClick = vi.fn();
    render(<Navbar onCartClick={handleCartClick} />);
    
    const cartButton = screen.getByRole('button', { name: /cart/i });
    cartButton.focus();
    await user.keyboard(' ');
    
    expect(handleCartClick).toHaveBeenCalledTimes(1);
  });
});

describe('Navbar - Accessibility', () => {
  it('should have navigation role', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should have searchbox role for search input', () => {
    render(<Navbar />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should have accessible labels for icon buttons', () => {
    render(<Navbar />);
    expect(screen.getByRole('button', { name: /user/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument();
  });

  it('should use aria-label for search input', () => {
    render(<Navbar />);
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toHaveAttribute('aria-label');
  });
});
