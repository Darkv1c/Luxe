import { render, screen } from '@/lib/test-utils';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders checkbox element', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('handles checked state', () => {
    render(<Checkbox label="Checked" checked onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('handles unchecked state', () => {
    render(<Checkbox label="Unchecked" checked={false} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('handles onChange event', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="Test" onChange={handleChange} />);
    
    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Checkbox label="Disabled" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('applies disabled styles', () => {
    const { container } = render(<Checkbox label="Disabled" disabled />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('disabled');
  });

  it('handles indeterminate state', () => {
    render(<Checkbox label="Indeterminate" indeterminate />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('applies error state', () => {
    const { container } = render(<Checkbox label="Error" error />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('error');
  });

  it('displays error message', () => {
    render(<Checkbox label="Test" error errorMessage="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not show error message when error is false', () => {
    render(<Checkbox label="Test" errorMessage="Error message" />);
    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
  });

  it('applies small size', () => {
    render(<Checkbox label="Small" size="sm" />);
    const input = screen.getByRole('checkbox');
    expect(input.className).toMatch(/sm/);
  });

  it('applies medium size (default)', () => {
    render(<Checkbox label="Medium" size="md" />);
    const input = screen.getByRole('checkbox');
    expect(input.className).toMatch(/md/);
  });

  it('applies large size', () => {
    render(<Checkbox label="Large" size="lg" />);
    const input = screen.getByRole('checkbox');
    expect(input.className).toMatch(/lg/);
  });

  it('applies custom className', () => {
    const { container } = render(<Checkbox label="Custom" className="custom-checkbox" />);
    expect(container.firstChild).toHaveClass('custom-checkbox');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox label="Test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('associates label with checkbox', () => {
    render(<Checkbox label="Test" id="test-checkbox" />);
    const label = screen.getByText('Test');
    const checkbox = screen.getByRole('checkbox');
    expect(label).toHaveAttribute('for', 'test-checkbox');
    expect(checkbox).toHaveAttribute('id', 'test-checkbox');
  });

  it('renders without label', () => {
    render(<Checkbox aria-label="Hidden label" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.queryByText('Hidden label')).not.toBeInTheDocument();
  });
});

describe('Checkbox - Keyboard Navigation', () => {
  it('should be focusable with Tab key', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Test" />);
    
    await user.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();
  });

  it('should toggle with Space key', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="Toggle" onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    await user.keyboard(' ');
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should skip when disabled', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Checkbox label="First" />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Last" />
      </>
    );
    
    await user.tab();
    expect(screen.getByLabelText('First')).toHaveFocus();
    await user.tab();
    expect(screen.getByLabelText('Last')).toHaveFocus();
  });

  it('should not toggle disabled checkbox with keyboard', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="Disabled" disabled onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus(); // Try to focus
    await user.keyboard(' ');
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should handle Enter key to submit forms', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn((e) => e.preventDefault());
    
    render(
      <form onSubmit={handleSubmit}>
        <Checkbox label="Agree" />
        <button type="submit">Submit</button>
      </form>
    );
    
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    await user.keyboard('{Enter}');
    
    // Enter on checkbox in form should submit the form
    expect(handleSubmit).toHaveBeenCalled();
  });
});
