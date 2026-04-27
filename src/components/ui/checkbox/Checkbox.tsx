import React, { useId } from 'react';
import styles from './checkbox.module.scss';
import { CheckboxProps } from './checkbox.types';

export const Checkbox = ({
  className = '',
  label,
  description,
  id,
  error = false,
  size = 'md',
  color = 'primary',
  variant = 'default',
  align = 'start',
  reverse = false,
  disabled = false,
  icon,
  children, // For custom content (e.g. adding an image)
  ...props
}: CheckboxProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const descriptionId = description ? `${inputId}-desc` : undefined;
  const errorId = typeof error === 'string' ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  // Class Construction
  const containerClasses = [
    styles.container,
    styles[size],
    styles[color],
    styles[variant],
    styles[`align-${align}`],
    reverse ? styles.reverse : '',
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className={styles.controlWrapper}>
        <input
          id={inputId}
          type="checkbox"
          className={styles.nativeInput}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />
        
        {/* Visual Box (Animasyonlu Kutu) */}
        <div className={styles.visualBox}>
          {icon || (
            <svg className={styles.checkIcon} viewBox="0 0 16 16">
              <polyline points="3 8 7 12 13 4" />
            </svg>
          )}
        </div>
      </div>

      {/* Content Area */}
      {(label || description || children) && (
        <label htmlFor={inputId} className={styles.content}>
          {label && <span className={styles.labelTitle}>{label}</span>}
          {description && (
            <span id={descriptionId} className={styles.description}>
              {description}
            </span>
          )}
          {children}
        </label>
      )}
      {typeof error === 'string' && (
        <span id={errorId} className={styles.description} role="alert" aria-live="polite">
          {error}
        </span>
      )}
    </div>
  );
};