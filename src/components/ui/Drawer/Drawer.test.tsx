import { render, screen } from '@/lib/test-utils';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('renders children and can be opened/closed via prop', async () => {
    const { rerender } = render(<Drawer open={false}>Hidden</Drawer>);
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();

    rerender(<Drawer open>Visible</Drawer>);
    expect(screen.getByText('Visible')).toBeInTheDocument();
  });
});
