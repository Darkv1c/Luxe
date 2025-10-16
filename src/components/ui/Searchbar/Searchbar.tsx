import { forwardRef, InputHTMLAttributes } from 'react';
import { Input } from '../Input';

export interface SearchbarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  ({ placeholder = 'Buscar productos, marcas, categorías...', size = 'md', ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="search"
        size={size}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);

Searchbar.displayName = 'Searchbar';
