import { forwardRef, InputHTMLAttributes, useEffect, useRef } from 'react';
import { cn, generateId } from '@/lib/utils';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error = false,
      errorMessage,
      indeterminate = false,
      size = 'md',
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || generateId('checkbox');
    const internalRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const element = (ref as React.RefObject<HTMLInputElement>)?.current || internalRef.current;
      if (element) {
        element.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    return (
      <div
        className={cn(
          styles.wrapper,
          {
            [styles.disabled]: disabled,
            [styles.error]: error,
          },
          className
        )}
      >
        <div className={styles.checkboxContainer}>
          <input
            ref={ref || internalRef}
            type="checkbox"
            id={checkboxId}
            className={cn(styles.checkbox, styles[size])}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={error && errorMessage ? `${checkboxId}-error` : undefined}
            {...props}
          />
          {label && (
            <label htmlFor={checkboxId} className={styles.label}>
              {label}
            </label>
          )}
        </div>
        {error && errorMessage && (
          <span id={`${checkboxId}-error`} className={styles.errorMessage}>
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
