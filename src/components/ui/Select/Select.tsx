import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn, generateId } from '@/lib/utils';
import { Icon } from '../Icon';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      label,
      placeholder,
      error = false,
      errorMessage,
      helperText,
      size = 'md',
      className,
      id,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const selectId = id || generateId('select');

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            id={selectId}
            className={cn(
              styles.select,
              styles[size],
              {
                [styles.error]: error,
                [styles.disabled]: disabled,
              },
              className
            )}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={
              error && errorMessage
                ? `${selectId}-error`
                : helperText
                ? `${selectId}-helper`
                : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <Icon name="chevron-down" size={20} className={styles.icon} />
        </div>
        {error && errorMessage && (
          <span id={`${selectId}-error`} className={styles.errorMessage}>
            {errorMessage}
          </span>
        )}
        {!error && helperText && (
          <span id={`${selectId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
