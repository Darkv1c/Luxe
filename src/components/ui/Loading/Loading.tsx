import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import styles from './Loading.module.css';

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary';
  label?: string;
  showLabel?: boolean;
  centered?: boolean;
  className?: string;
}

export function Loading({
  size = 'md',
  variant = 'default',
  label = 'Loading...',
  showLabel = false,
  centered = true,
  className,
  ...props
}: LoadingProps) {
  return (
    <div
      className={cn(
        styles.wrapper,
        { [styles.centered]: centered },
        className
      )}
      {...props}
    >
      <div
        className={cn(
          styles.spinner,
          styles[size],
          styles[variant]
        )}
        role="status"
        aria-live="polite"
      >
        <span className={showLabel ? styles.label : styles.srOnly}>
          {label}
        </span>
      </div>
    </div>
  );
}
