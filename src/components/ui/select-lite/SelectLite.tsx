import React, { forwardRef, useId } from 'react';
import ChevronDown from '@/components/ui/icon/icons/ChevronDown';
import styles from './select-lite.module.scss';
import { Icon } from '../icon';

export interface SelectLiteOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectLiteProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectLiteOption[];
  error?: string | boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  placeholder?: string;
}

export const SelectLite = forwardRef<HTMLSelectElement, SelectLiteProps>(
  ({ 
    options, 
    label, 
    error = false, 
    size = 'md', 
    className = '', 
    fullWidth = false,
    placeholder,
    onChange,
    disabled,
    ...props 
  }, ref) => {

  const containerClasses = [
    styles.container,
    styles[size],
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  const uniqueId = useId();
  const errorId = typeof error === 'string' ? `${uniqueId}-error` : undefined;

  return (
    <div className={containerClasses}>
      {label && <label htmlFor={uniqueId} className={styles.label}>{label}</label>}

      <div className={styles.wrapper}>
        <select
          ref={ref}
          id={uniqueId}
          className={styles.nativeSelect}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={errorId}
          defaultValue={placeholder}
          onChange={onChange}
          {...props}
        >
          {/* Placeholder Hack: Boş value ile disabled option */}
          {placeholder && (
            <option disabled hidden>
              {placeholder}
            </option>
          )}

          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
            >
              {opt.label}
            </option>
          ))}
        </select>

        <div className={styles.iconWrapper} aria-hidden="true">
          <Icon icon={ChevronDown} size={16} decorative />
        </div>
      </div>

      {typeof error === 'string' && <span id={errorId} className={styles.errorMessage} role="alert" aria-live="polite">{error}</span>}
    </div>
  );
});
