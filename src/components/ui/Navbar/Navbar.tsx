import { HTMLAttributes, FormEvent, useState } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Badge } from '../Badge';
import styles from './Navbar.module.css';

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  brandName?: string;
  onSearch?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  onUserClick?: () => void;
  onCartClick?: () => void;
  cartItemCount?: number;
  className?: string;
}

export function Navbar({
  brandName = 'Luxe',
  onSearch,
  onSearchSubmit,
  onUserClick,
  onCartClick,
  cartItemCount = 0,
  className,
  ...props
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchSubmit?.(searchQuery);
  };

  return (
    <nav className={cn(styles.navbar, className)} {...props}>
      <div className={styles.container}>
        {/* Brand/Logo */}
        <div className={styles.brand}>
          <span className={styles.brandName}>{brandName}</span>
        </div>

        {/* Search Bar */}
        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <div className={styles.searchContainer}>
            <Icon name="search" size={20} className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              role="searchbox"
              className={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search products"
            />
          </div>
        </form>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <IconButton
            icon="user"
            aria-label="User account"
            onClick={onUserClick}
            variant="ghost"
            size="md"
          />
          <div className={styles.cartButtonWrapper}>
            <IconButton
              icon="shopping-cart"
              aria-label="Shopping cart"
              onClick={onCartClick}
              variant="ghost"
              size="md"
            />
            {cartItemCount > 0 && (
              <Badge variant="error" size="sm" className={styles.cartBadge}>
                {cartItemCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
