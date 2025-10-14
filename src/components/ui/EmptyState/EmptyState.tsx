import { ReactNode, HTMLAttributes } from 'react';
import { Icon, IconName } from '../Icon';
import { Button } from '../Button';
import { cn } from '@/lib/utils';
import styles from './EmptyState.module.css';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: IconName;
  actionLabel?: string;
  onAction?: () => void;
  size?: 'compact' | 'default' | 'large';
  children?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  size = 'default',
  children,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        styles.container,
        styles[size],
        className
      )}
      {...props}
    >
      {icon && (
        <div className={styles.iconWrapper}>
          <Icon
            name={icon}
            size={size === 'compact' ? 32 : size === 'large' ? 64 : 48}
            className={styles.icon}
          />
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
      {actionLabel && onAction && (
        <div className={styles.action}>
          <Button onClick={onAction} variant="primary">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
