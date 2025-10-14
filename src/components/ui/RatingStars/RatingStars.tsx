import { HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import { cn } from '@/lib/utils';
import styles from './RatingStars.module.css';

export interface RatingStarsProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}

export function RatingStars({
  value,
  count,
  size = 16,
  className,
  ...props
}: RatingStarsProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(value));

  return (
    <div
      className={cn(styles.container, className)}
      aria-label={`Valoración ${value} de 5`}
      {...props}
    >
      <div className={styles.stars}>
        {stars.map((filled, index) => (
          <Icon
            key={index}
            name="star"
            size={size}
            filled={filled}
            color={filled ? '#f59e0b' : '#e5e7eb'}
            className={styles.star}
          />
        ))}
      </div>
      {typeof count === 'number' && (
        <span className={styles.count}>({count})</span>
      )}
    </div>
  );
}
