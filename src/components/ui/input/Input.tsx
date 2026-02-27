"use client";

import React, { useState, useId } from 'react';
import styles from './input.module.scss';
import { InputProps } from './input.types';
import XIcon from '@/components/ui/icon/icons/X';
import EyeIcon from '@/components/ui/icon/icons/Eye';
import EyeOffIcon from '@/components/ui/icon/icons/EyeOff';
import { Icon } from '../icon';
import { clsx } from '@/utils';

export const Input = ({
  type = 'text',
  className = '',
  name,
  label,
  placeholder,
  unit,
  value,
  onChange,
  onPaste,
  error = false,
  size = 'md',
  variant = 'default',
  isClearable = false, // clearable default false yaptım, explicit olmalı
  disabled = false,
  readOnly = false,
  rows = 3,
  fullWidth = false,
  containerStyle,
  cssVars,
  ...props
}: InputProps) => {
  const uniqueId = useId(); // Erişilebilirlik için unique ID
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const currentType = isPassword && showPassword ? 'text' : type;
  const isTextarea = type === 'textarea';
  const isFloating = variant === 'floating' && !!label && !isTextarea;
  const hasValue = value !== undefined && value !== null && `${value}`.length > 0;
  const resolvedContainerStyle = {
    ...(containerStyle ?? {}),
    ...((cssVars ?? {}) as React.CSSProperties),
  };

  // Handle Clear
  const handleClear = () => {
    if (onChange) {
      // React SyntheticEvent simülasyonu
      const event = {
        target: { value: '', name },
        currentTarget: { value: '', name }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className={clsx(
      styles.container,
      styles[size],
      styles[variant],
      error ? styles.error : '',
      fullWidth ? styles.fullWidth : '',
      disabled ? styles.disabled : '',
      className
    )}
      style={resolvedContainerStyle}
    >
      {label && !isFloating && (
        <label htmlFor={uniqueId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={clsx(
        styles.wrapper,
        isFloating && styles.floatingWrapper,
        isFloating && hasValue && styles.hasValue,
        (isClearable || isPassword) && styles.withActions,
        unit && styles.withUnit
      )}>
        {isTextarea ? (
          <textarea
            id={uniqueId}
            name={name}
            value={value}
            onChange={onChange as any}
            onPaste={onPaste as any}
            readOnly={readOnly}
            disabled={disabled}
            rows={rows}
            className={styles.inputControl}
            placeholder={placeholder}
            {...(props as any)}
          />
        ) : (
          <input
            id={uniqueId}
            type={currentType}
            name={name}
            value={value}
            onChange={onChange}
            onPaste={onPaste}
            readOnly={readOnly}
            disabled={disabled}
            className={clsx(styles.inputControl, isFloating && styles.floatingInput)}
            aria-invalid={!!error}
            placeholder={isFloating ? (placeholder ?? ' ') : placeholder}
            {...props}
          />
        )}

        {isFloating && (
          <label htmlFor={uniqueId} className={styles.floatingLabel}>
            {label}
          </label>
        )}

        {/* Unit (Suffix) */}
        {unit && !isTextarea && <span className={styles.unit}>{unit}</span>}

        {/* Actions Wrapper */}
        {((isClearable && value) || isPassword) && (
          <div className={styles.actions}>

            {/* Clear Button */}
            {value && isClearable && !readOnly && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className={styles.actionButton}
                aria-label="Clear input"
                tabIndex={-1}
              >
                <Icon icon={XIcon} size={16} />
              </button>
            )}

            {/* Password Toggle */}
            {isPassword && !readOnly && !disabled && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.actionButton}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <Icon icon={EyeOffIcon} size={16} /> : <Icon icon={EyeIcon} size={16} />}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Error Message Support */}
      {typeof error === 'string' && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </div>
  );
};