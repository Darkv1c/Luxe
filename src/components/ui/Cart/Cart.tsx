import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import styles from './Cart.module.css';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartProps extends HTMLAttributes<HTMLDivElement> {
  items: CartItem[];
  onQuantityChange?: (itemId: string, newQuantity: number) => void;
  onRemove?: (itemId: string) => void;
  onCheckout?: () => void;
  className?: string;
}

export function Cart({
  items,
  onQuantityChange,
  onRemove,
  onCheckout,
  className,
  ...props
}: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrease = (itemId: string, currentQuantity: number) => {
    onQuantityChange?.(itemId, currentQuantity + 1);
  };

  const handleDecrease = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      onQuantityChange?.(itemId, currentQuantity - 1);
    }
  };

  return (
    <div className={cn(styles.cart, className)} {...props}>
      <h2 className={styles.title}>Shopping Cart</h2>

      {items.length === 0 ? (
        <div className={styles.emptyState}>
          <Icon name="shopping-cart" size={48} className={styles.emptyIcon} />
          <p className={styles.emptyText}>Your cart is empty</p>
        </div>
      ) : (
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />
              )}
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
              </div>

              <div className={styles.itemActions}>
                <div className={styles.quantityControl}>
                  <IconButton
                    icon="chevron-down"
                    aria-label="Decrease quantity"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDecrease(item.id, item.quantity)}
                    disabled={item.quantity <= 1}
                  />
                  <span className={styles.quantity}>{item.quantity}</span>
                  <IconButton
                    icon="chevron-down"
                    aria-label="Increase quantity"
                    size="sm"
                    variant="ghost"
                    onClick={() => handleIncrease(item.id, item.quantity)}
                    className={styles.increaseButton}
                  />
                </div>

                <IconButton
                  icon="x"
                  aria-label="Remove item from cart"
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemove?.(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Subtotal:</span>
          <span className={styles.summaryValue}>${subtotal.toFixed(2)}</span>
        </div>

        <Button
          variant="primary"
          size="lg"
          className={styles.checkoutButton}
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
