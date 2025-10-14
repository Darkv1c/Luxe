import { render, screen } from '@/lib/test-utils';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { Select } from './Select';

describe('Select', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  it('renders select element', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select options={options} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Select options={options} placeholder="Select an option" />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('handles controlled value', () => {
    const { rerender } = render(
      <Select options={options} value="1" onChange={() => {}} />
    );
    expect(screen.getByRole('combobox')).toHaveValue('1');
    
    rerender(<Select options={options} value="2" onChange={() => {}} />);
    expect(screen.getByRole('combobox')).toHaveValue('2');
  });

  it('handles onChange event', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Select options={options} onChange={handleChange} />);
    
    await user.selectOptions(screen.getByRole('combobox'), '2');
    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('applies error state', () => {
    render(<Select options={options} error />);
    const select = screen.getByRole('combobox');
    expect(select.className).toMatch(/error/);
  });

  it('displays error message', () => {
    render(<Select options={options} error errorMessage="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not show error message when error is false', () => {
    render(<Select options={options} errorMessage="Error message" />);
    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Select options={options} label="Choose option" />);
    expect(screen.getByText('Choose option')).toBeInTheDocument();
  });

  it('associates label with select', () => {
    render(<Select options={options} label="Choose" id="select-input" />);
    const label = screen.getByText('Choose');
    const select = screen.getByRole('combobox');
    expect(label).toHaveAttribute('for', 'select-input');
    expect(select).toHaveAttribute('id', 'select-input');
  });

  it('shows required indicator', () => {
    render(<Select options={options} label="Choose" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies small size', () => {
    render(<Select options={options} size="sm" />);
    const select = screen.getByRole('combobox');
    expect(select.className).toMatch(/sm/);
  });

  it('applies medium size (default)', () => {
    render(<Select options={options} size="md" />);
    const select = screen.getByRole('combobox');
    expect(select.className).toMatch(/md/);
  });

  it('applies large size', () => {
    render(<Select options={options} size="lg" />);
    const select = screen.getByRole('combobox');
    expect(select.className).toMatch(/lg/);
  });

  it('applies custom className', () => {
    render(<Select options={options} className="custom-select" />);
    expect(screen.getByRole('combobox')).toHaveClass('custom-select');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLSelectElement>();
    render(<Select options={options} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('renders with helper text', () => {
    render(<Select options={options} helperText="Choose your preferred option" />);
    expect(screen.getByText('Choose your preferred option')).toBeInTheDocument();
  });

  it('disables placeholder option', () => {
    render(<Select options={options} placeholder="Choose" />);
    const placeholderOption = screen.getByText('Choose');
    expect(placeholderOption).toHaveAttribute('disabled');
  });
});
