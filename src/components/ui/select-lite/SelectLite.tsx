import React, { forwardRef } from 'react';
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

export const SelectLite = ({
  options,
  label,
  error = false,
  size = 'md',
  className = '',
  fullWidth = false,
  placeholder,
  disabled,
  ...props
}: SelectLiteProps) => {

  const containerClasses = [
    styles.container,
    styles[size],
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.wrapper}>
        <select
          className={styles.nativeSelect}
          disabled={disabled}
          defaultValue={placeholder}
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

        <div className={styles.iconWrapper}>
          <Icon icon={ChevronDown} size={16} />
        </div>
      </div>

      {typeof error === 'string' && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}