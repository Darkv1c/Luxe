import { render, screen } from '@/lib/test-utils';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Searchbar } from './Searchbar';
import { useState } from 'react';

describe('Searchbar', () => {
  it('accepts input and updates value', async () => {
    const user = userEvent.setup();
    
    function TestSearchbar() {
      const [value, setValue] = useState('');
      return (
        <Searchbar 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
        />
      );
    }

    render(<TestSearchbar />);

    const input = screen.getByPlaceholderText(/buscar productos/i);
    await user.click(input);
    await user.keyboard('watch');

    expect(input).toHaveValue('watch');
  });
});
