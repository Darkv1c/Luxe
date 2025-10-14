import { render, screen } from '@/lib/test-utils';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders with title', () => {
    render(<EmptyState title="No results found" />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <EmptyState
        title="No products"
        description="Try adjusting your search or filters"
      />
    );
    expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
  });

  it('renders without description', () => {
    const { container } = render(<EmptyState title="Empty" />);
    expect(container.textContent).toBe('Empty');
  });

  it('renders with icon', () => {
    const { container } = render(<EmptyState title="Empty" icon="search" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders without icon when not provided', () => {
    const { container } = render(<EmptyState title="Empty" />);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('renders with action button', () => {
    const handleClick = vi.fn();
    render(
      <EmptyState
        title="No results"
        actionLabel="Clear filters"
        onAction={handleClick}
      />
    );
    expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
  });

  it('handles action button click', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <EmptyState
        title="No results"
        actionLabel="Retry"
        onAction={handleClick}
      />
    );
    
    await user.click(screen.getByRole('button', { name: /retry/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not render button when actionLabel is not provided', () => {
    render(<EmptyState title="Empty" onAction={() => {}} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('does not render button when onAction is not provided', () => {
    render(<EmptyState title="Empty" actionLabel="Click me" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <EmptyState title="Empty" className="custom-empty-state" />
    );
    expect(container.firstChild).toHaveClass('custom-empty-state');
  });

  it('renders with custom children', () => {
    render(
      <EmptyState title="Custom">
        <p>Custom content here</p>
      </EmptyState>
    );
    expect(screen.getByText('Custom content here')).toBeInTheDocument();
  });

  it('applies compact size', () => {
    const { container } = render(<EmptyState title="Compact" size="compact" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('compact');
  });

  it('applies default size', () => {
    const { container } = render(<EmptyState title="Default" size="default" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('default');
  });

  it('applies large size', () => {
    const { container } = render(<EmptyState title="Large" size="large" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('large');
  });
});
