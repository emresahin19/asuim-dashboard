import React, { useId } from 'react';
import styles from './radio.module.scss';
import { RadioProps } from './radio.types';

export const Radio = ({
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
  hideIndicator = false,
  disabled = false,
  children,
  ...props
}: RadioProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const containerClasses = [
    styles.container,
    styles[size],
    styles[color],
    styles[variant],
    styles[`align-${align}`],
    reverse ? styles.reverse : '',
    hideIndicator ? styles.hideIndicator : '',
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className={styles.controlWrapper}>
        <input
          id={inputId}
          type="radio"
          className={styles.nativeInput}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={description ? `${inputId}-desc` : undefined}
          {...props}
        />
        
        {/* Visual Circle (Daire ve Nokta) */}
        <div className={styles.visualBox}>
          <div className={styles.dot} />
        </div>
      </div>

      {/* Content Area */}
      {(label || description || children) && (
        <label htmlFor={inputId} className={styles.content}>
          {label && <span className={styles.labelTitle}>{label}</span>}
          {description && (
            <span id={`${inputId}-desc`} className={styles.description}>
              {description}
            </span>
          )}
          {children}
        </label>
      )}
    </div>
  );
};