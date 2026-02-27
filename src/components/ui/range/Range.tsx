import React, { useId, useMemo } from 'react';
import styles from './range.module.scss';
import { RangeProps } from './range.types';

export const Range = ({
  className = '',
  label,
  showValue = false,
  formatValue,
  minLabel,
  maxLabel,
  error = false,
  size = 'md',
  color = 'primary',
  disabled = false,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  style,
  thumbImage,
  thumbSize,
  ...props
}: RangeProps) => {
  const generatedId = useId();
  const inputId = props.id || generatedId;

  const currentValue = Number(value ?? defaultValue ?? min);
  const minVal = Number(min);
  const maxVal = Number(max);

  const progressPercent = useMemo(() => {
    return ((currentValue - minVal) * 100) / (maxVal - minVal);
  }, [currentValue, minVal, maxVal]);

  const thumbUrl = useMemo(() => {
    if (!thumbImage) return undefined;
    const src = typeof thumbImage === 'string' ? thumbImage : thumbImage.src;
    return `url('${src}')`;
  }, [thumbImage]);

  const containerClasses = [
    styles.container,
    styles[size],
    styles[color],
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  const displayValue = formatValue ? formatValue(currentValue) : currentValue;

  return (
    <div className={containerClasses}>
      
      {(label || showValue) && (
        <div className={styles.header}>
          {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
          {showValue && <span className={styles.valueDisplay}>{displayValue}</span>}
        </div>
      )}

      <div className={styles.trackWrapper}>
        <input
          id={inputId}
          type="range"
          className={styles.nativeRange}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={defaultValue}
          style={{
            ...style,
            // SCSS'e dinamik veriyi buradan akıtıyoruz
            '--range-progress': `${progressPercent}%`,
            '--range-thumb': thumbUrl,
            '--thumb-size': thumbSize ? `${thumbSize}px` : undefined
          } as React.CSSProperties}
          aria-valuemin={minVal}
          aria-valuemax={maxVal}
          aria-valuenow={currentValue}
          {...props}
        />
      </div>

      {/* Footer: Min/Max Labels */}
      {(minLabel || maxLabel) && (
        <div className={styles.footer}>
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
      
      {/* Error Message */}
      {typeof error === 'string' && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};