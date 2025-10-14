import { ButtonHTMLAttributes } from 'react';
import { Icon, IconName } from '../Icon';
import { cn } from '@/lib/utils';
import styles from './IconButton.module.css';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-label': string;
}

export function IconButton({
  icon,
  variant = 'default',
  size = 'md',
  active = false,
  rounded = false,
  disabled = false,
  className,
  onClick,
  ...props
}: IconButtonProps) {
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <button
      type="button"
      className={cn(
        styles.iconButton,
        styles[variant],
        styles[size],
        {
          [styles.active]: active,
          [styles.disabled]: disabled,
          [styles.rounded]: rounded,
        },
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <Icon name={icon} size={iconSizes[size]} filled={active} />
    </button>
  );
}
