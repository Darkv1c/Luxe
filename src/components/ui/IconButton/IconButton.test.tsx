import { render, screen } from '@/lib/test-utils';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders icon button', () => {
    render(<IconButton icon="heart" aria-label="Favorite" />);
    expect(screen.getByRole('button', { name: /favorite/i })).toBeInTheDocument();
  });

  it('renders correct icon', () => {
    const { container } = render(<IconButton icon="shopping-cart" aria-label="Cart" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<IconButton icon="heart" onClick={handleClick} aria-label="Like" />);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<IconButton icon="heart" disabled aria-label="Disabled" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies disabled styles', () => {
    render(<IconButton icon="heart" disabled aria-label="Disabled" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/disabled/);
  });

  it('applies default variant', () => {
    render(<IconButton icon="heart" aria-label="Default" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/default/);
  });

  it('applies primary variant', () => {
    render(<IconButton icon="heart" variant="primary" aria-label="Primary" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/primary/);
  });

  it('applies ghost variant', () => {
    render(<IconButton icon="heart" variant="ghost" aria-label="Ghost" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/ghost/);
  });

  it('applies small size', () => {
    render(<IconButton icon="heart" size="sm" aria-label="Small" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/sm/);
  });

  it('applies medium size (default)', () => {
    render(<IconButton icon="heart" size="md" aria-label="Medium" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/md/);
  });

  it('applies large size', () => {
    render(<IconButton icon="heart" size="lg" aria-label="Large" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/lg/);
  });

  it('applies custom className', () => {
    render(<IconButton icon="heart" className="custom-icon-btn" aria-label="Custom" />);
    expect(screen.getByRole('button')).toHaveClass('custom-icon-btn');
  });

  it('shows active state', () => {
    render(<IconButton icon="heart" active aria-label="Active" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/active/);
  });

  it('renders filled icon when active', () => {
    const { container } = render(<IconButton icon="heart" active aria-label="Active" />);
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('fill', 'currentColor');
  });

  it('requires aria-label for accessibility', () => {
    render(<IconButton icon="heart" aria-label="Favorite" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Favorite');
  });

  it('forwards other props to button element', () => {
    render(<IconButton icon="heart" data-testid="custom-button" aria-label="Test" />);
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
  });

  it('applies rounded variant', () => {
    render(<IconButton icon="heart" rounded aria-label="Rounded" />);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/rounded/);
  });
});

describe('IconButton - Keyboard Navigation', () => {
  it('should be focusable with Tab key', async () => {
    const user = userEvent.setup();
    render(<IconButton icon="heart" aria-label="Favorite" />);
    
    await user.tab();
    expect(screen.getByRole('button', { name: /favorite/i })).toHaveFocus();
  });

  it('should activate with Enter key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<IconButton icon="heart" onClick={handleClick} aria-label="Like" />);
    
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should activate with Space key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<IconButton icon="heart" onClick={handleClick} aria-label="Like" />);
    
    screen.getByRole('button').focus();
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should skip when disabled', async () => {
    const user = userEvent.setup();
    render(
      <>
        <IconButton icon="heart" aria-label="First" />
        <IconButton icon="star" disabled aria-label="Disabled" />
        <IconButton icon="user" aria-label="Last" />
      </>
    );
    
    await user.tab();
    expect(screen.getByRole('button', { name: /first/i })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: /last/i })).toHaveFocus();
  });

  it('should not activate disabled button with keyboard', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<IconButton icon="heart" disabled onClick={handleClick} aria-label="Disabled" />);
    
    const button = screen.getByRole('button');
    button.focus(); // Try to focus
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});
