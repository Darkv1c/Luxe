import { render, screen } from '@/lib/test-utils';
import { describe, it, expect } from 'vitest';
import { Loading } from './Loading';

describe('Loading', () => {
  it('renders loading spinner', () => {
    const { container } = render(<Loading />);
    expect(container.querySelector('[role="status"]')).toBeInTheDocument();
  });

  it('has accessible label', () => {
    render(<Loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<Loading label="Loading products..." />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('applies small size', () => {
    const { container } = render(<Loading size="sm" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner?.className).toMatch(/sm/);
  });

  it('applies medium size (default)', () => {
    const { container } = render(<Loading size="md" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner?.className).toMatch(/md/);
  });

  it('applies large size', () => {
    const { container } = render(<Loading size="lg" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner?.className).toMatch(/lg/);
  });

  it('applies custom className', () => {
    const { container } = render(<Loading className="custom-loading" />);
    expect(container.firstChild).toHaveClass('custom-loading');
  });

  it('centers by default', () => {
    const { container } = render(<Loading />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('centered');
  });

  it('does not center when centered is false', () => {
    const { container } = render(<Loading centered={false} />);
    expect(container.firstChild).not.toHaveClass('centered');
  });

  it('shows text label when showLabel is true', () => {
    render(<Loading showLabel />);
    const label = screen.getByText('Loading...');
    expect(label).toBeVisible();
  });

  it('hides text label visually when showLabel is false', () => {
    render(<Loading showLabel={false} />);
    const label = screen.getByText('Loading...');
    expect(label.className).toMatch(/srOnly/);
  });

  it('renders with custom color variant', () => {
    const { container } = render(<Loading variant="primary" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner?.className).toMatch(/primary/);
  });

  it('applies default variant', () => {
    const { container } = render(<Loading variant="default" />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner?.className).toMatch(/default/);
  });

  it('has proper ARIA attributes for accessibility', () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveAttribute('role', 'status');
    expect(spinner).toHaveAttribute('aria-live', 'polite');
  });
});
