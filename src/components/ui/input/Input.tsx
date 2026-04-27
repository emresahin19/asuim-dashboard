"use client";

import React, { useEffect, useRef, useState, useId } from 'react';
import styles from './input.module.scss';
import { InputProps } from './input.types';
import XIcon from '@/components/ui/icon/icons/X';
import EyeIcon from '@/components/ui/icon/icons/Eye';
import EyeOffIcon from '@/components/ui/icon/icons/EyeOff';
import CopyIcon from '@/components/ui/icon/icons/Copy';
import { Icon } from '../icon';
import { clsx } from '@/utils';
import { FileDropInput } from './FileDropInput';

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
  isClearable = false, // clearable defaults to false, must be set explicitly
  isCopyable = false,
  disabled = false,
  readOnly = false,
  rows = 3,
  fullWidth = false,
  containerStyle,
  cssVars,
  dropText,
  helperText,
  ...props
}: InputProps) => {
  const uniqueId = useId(); // Unique ID for accessibility
  const [showPassword, setShowPassword] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorId = typeof error === 'string' ? `${uniqueId}-error` : undefined;

  const isPassword = type === 'password';
  const isFileInput = type === 'file';
  const currentType = isPassword && showPassword ? 'text' : type;
  const isTextarea = type === 'textarea';
  const isFloating = variant === 'floating' && !!label && !isTextarea;
  const hasValue = value !== undefined && value !== null && `${value}`.length > 0;
  const canCopy = isCopyable && hasValue && !disabled && !isTextarea;
  const resolvedContainerStyle = {
    ...(containerStyle ?? {}),
    ...((cssVars ?? {}) as React.CSSProperties),
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  if (isFileInput) {
    return (
      <FileDropInput
        className={className}
        name={name}
        label={label}
        error={error}
        size={size}
        variant={variant}
        disabled={disabled}
        readOnly={readOnly}
        fullWidth={fullWidth}
        containerStyle={containerStyle}
        cssVars={cssVars}
        onChange={onChange}
        dropText={dropText}
        helperText={helperText}
        {...props}
      />
    );
  }

  // Handle Clear
  const handleClear = () => {
    if (onChange) {
      // React SyntheticEvent simulation
      const event = {
        target: { value: '', name },
        currentTarget: { value: '', name }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const handleCopy = async () => {
    const textToCopy = `${value ?? ''}`;
    if (!textToCopy) return;

    let copied = false;

    try {
      await navigator.clipboard.writeText(textToCopy);
      copied = true;
    } catch {
      // Fallback for environments where Clipboard API is blocked.
      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = textToCopy;
      tempTextarea.setAttribute('readonly', '');
      tempTextarea.style.position = 'absolute';
      tempTextarea.style.left = '-9999px';
      document.body.appendChild(tempTextarea);
      tempTextarea.select();
      copied = document.execCommand('copy');
      document.body.removeChild(tempTextarea);
    }

    if (!copied) return;

    setIsCopied(true);
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
    copyTimeoutRef.current = setTimeout(() => {
      setIsCopied(false);
      copyTimeoutRef.current = null;
    }, 2000);
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
        (isClearable || isPassword || canCopy) && styles.withActions,
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
            aria-invalid={!!error}
            aria-describedby={errorId}
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
            aria-describedby={errorId}
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
        {((isClearable && value) || isPassword || canCopy) && (
          <div className={styles.actions}>

            {/* Clear Button */}
            {value && isClearable && !readOnly && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className={styles.actionButton}
                aria-label="Clear input"
              >
                <Icon icon={XIcon} size={16} decorative />
              </button>
            )}

            {/* Password Toggle */}
            {isPassword && !readOnly && !disabled && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.actionButton}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Icon icon={EyeOffIcon} size={16} decorative /> : <Icon icon={EyeIcon} size={16} decorative />}
              </button>
            )}

            {/* Copy Value */}
            {canCopy && (
              <button
                type="button"
                onClick={handleCopy}
                className={clsx(styles.actionButton, styles.copyActionButton)}
                aria-label="Copy value"
              >
                {isCopied && <span className={styles.copyTooltip}>Copied</span>}
                <Icon icon={CopyIcon} size={16} decorative />
              </button>
            )}
          </div>
        )}
      </div>

      {helperText && (
        <span className={styles.helperText}>{helperText}</span>
      )}

      {/* Error Message Support */}
      {typeof error === 'string' && (
        <span id={errorId} className={styles.errorMessage} role="alert" aria-live="polite">{error}</span>
      )}
    </div>
  );
};