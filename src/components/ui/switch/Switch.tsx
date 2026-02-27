import React, { useId } from 'react';
import styles from './switch.module.scss';
import { SwitchProps } from './switch.types';
import Loader from '@/components/ui/icon/icons/Loader';
import { Icon } from '../icon';

export const Switch = ({
  className = '',
  label,
  description,
  id,
  error = false,
  size = 'md',
  color = 'primary',
  loading = false,
  disabled = false,
  reverse = false,
  checked,
  defaultChecked,
  ...props
}: SwitchProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const descriptionId = description ? `${inputId}-desc` : undefined;
  const errorId = typeof error === 'string' ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
  
  // Loading ise disabled sayılır
  const isDisabled = disabled || loading;

  const containerClasses = [
    styles.container,
    styles[size],
    styles[color],
    reverse ? styles.reverse : '',
    isDisabled ? styles.disabled : '',
    error ? styles.error : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Visual Switch Track */}
      <div className={styles.trackWrapper}>
        <input
          id={inputId}
          type="checkbox"
          role="switch"
          className={styles.nativeInput}
          disabled={isDisabled}
          checked={checked}
          defaultChecked={defaultChecked}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-busy={loading || undefined}
          {...props}
        />
        
        <div className={styles.track}>
          <span className={styles.thumb}>
             {/* Loading ise topuzun içinde spinner dönsün */}
             {loading && <Icon icon={Loader} className={styles.spinner} decorative />}
          </span>
        </div>
      </div>

      {/* Content Label */}
      {(label || description) && (
        <label htmlFor={inputId} className={styles.content}>
          {label && <span className={styles.labelTitle}>{label}</span>}
          {description && <span id={descriptionId} className={styles.description}>{description}</span>}
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