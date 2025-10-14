import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

const customRender = (ui: ReactElement, options: RenderOptions = {}) => {
  return render(ui, {
    // Add any global providers here in the future
    ...options,
  });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };