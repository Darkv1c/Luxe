import { render, screen } from '@/lib/test-utils';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders logo and navigation links', () => {
    render(<Navbar />);

    expect(screen.getByRole('img', { name: /luxe logo/i })).toBeInTheDocument();
    expect(screen.getAllByText(/hombre/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/mujer/i).length).toBeGreaterThan(0);
  });

  it('has search input accessible by role', async () => {
    // Search has been moved out of Navbar into a separate Searchbar component
  });

  it('renders cart and account icon buttons', () => {
    render(<Navbar />);

    expect(screen.getByLabelText(/open cart/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/open account/i)).toBeInTheDocument();
  });

  it('opens drawer on mobile menu click and closes on link click, restoring focus', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const menuButton = screen.getByLabelText(/open menu/i);
    menuButton.focus();
    await user.click(menuButton);

    // dialog should be present
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // click a link inside drawer (use getAllByText to get the drawer link)
    const links = screen.getAllByText(/hombre/i);
    const drawerLink = links.find(link => link.closest('[role="dialog"]'));
    await user.click(drawerLink!);

    // drawer should be closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // focus should be restored to the menu button
    expect(menuButton).toHaveFocus();
  });
});
