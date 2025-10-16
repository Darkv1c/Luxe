import { forwardRef, InputHTMLAttributes, ChangeEvent } from 'react';
import { cn, generateId } from '@/lib/utils';
import styles from './Slider.module.css';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  showValue?: boolean;
  showMinMax?: boolean;
  valueFormatter?: (value: number) => string;
  error?: boolean;
  errorMessage?: string;
  onChange?: (value: number, event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      showValue = false,
      showMinMax = false,
      valueFormatter,
      error = false,
      errorMessage,
      onChange,
      className,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const sliderId = id || generateId('slider');
    const currentValue = value ?? defaultValue ?? min;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      onChange?.(newValue, event);
    };

    const formatValue = (val: number) => {
      return valueFormatter ? valueFormatter(val) : val.toString();
    };

    const percentage = ((currentValue - min) / (max - min)) * 100;

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={sliderId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.sliderContainer}>
          {showMinMax && (
            <span className={styles.minMaxLabel}>{formatValue(min)}</span>
          )}
          <div className={styles.sliderWrapper}>
            <input
              ref={ref}
              type="range"
              id={sliderId}
              min={min}
              max={max}
              step={step}
              value={value}
              defaultValue={value === undefined ? defaultValue : undefined}
              onChange={handleChange}
              disabled={disabled}
              className={cn(
                styles.slider,
                {
                  [styles.error]: error,
                  [styles.disabled]: disabled,
                },
                className
              )}
              style={
                {
                  '--slider-percentage': `${percentage}%`,
                } as React.CSSProperties
              }
              aria-invalid={error}
              aria-describedby={error && errorMessage ? `${sliderId}-error` : undefined}
              {...props}
            />
            {showValue && (
              <span className={styles.valueDisplay}>{formatValue(currentValue)}</span>
            )}
          </div>
          {showMinMax && (
            <span className={styles.minMaxLabel}>{formatValue(max)}</span>
          )}
        </div>
        {error && errorMessage && (
          <span id={`${sliderId}-error`} className={styles.errorMessage}>
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
