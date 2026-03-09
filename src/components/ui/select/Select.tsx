"use client";
// src/components/ui/select/Select.tsx
import React, { useState, useRef, useId, useMemo } from 'react';
import ChevronDown from '@/components/ui/icon/icons/ChevronDown';
import X from '@/components/ui/icon/icons/X';
import Check from '@/components/ui/icon/icons/Check';
import Loader from '@/components/ui/icon/icons/Loader';
import { useClickOutside } from '@/hooks/useClickOutside';
import { SelectProps, SelectOption, SelectGroup } from './select.types';
import styles from './select.module.scss';
import { Icon } from '../icon';
import { clsx } from '@/utils';

const isGroup = (item: SelectOption | SelectGroup): item is SelectGroup => {
  return 'options' in item;
};

export const Select = ({
  options,
  value,
  onChange,
  isMulti = false,
  isSearchable = false,
  isClearable = true,
  isLoading = false,
  label,
  placeholder,
  error = false,
  disabled = false,
  size = 'md',
  variant = 'default',
  className = ''
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const uniqueId = useId();
  const menuId = `${uniqueId}-menu`;
  const errorId = typeof error === 'string' ? `${uniqueId}-error` : undefined;
  const isFloating = variant === 'floating' && !!label;
  const isLiteMulti = variant === 'lite' && isMulti;
  const selectedValues = isMulti && Array.isArray(value) ? value : [];
  const hasSelection = isMulti
    ? selectedValues.length > 0
    : !!value;
  const selectedCount = selectedValues.length;
  const liteSummaryText = selectedCount >= 2
    ? `${selectedCount} items selected`
    : selectedCount === 1
      ? selectedValues[0].label
      : '';

  useClickOutside(containerRef as React.RefObject<HTMLDivElement>, () => setIsOpen(false));

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;

    const lowerTerm = searchTerm.toLowerCase();

    return options.reduce((acc: (SelectOption | SelectGroup)[], item) => {
      if (isGroup(item)) {
        const filteredGroupOptions = item.options.filter(opt => {
          const searchSource = (opt.searchText || opt.label).toLowerCase();
          return searchSource.includes(lowerTerm);
        });
        if (filteredGroupOptions.length > 0) {
          acc.push({ ...item, options: filteredGroupOptions });
        }
      } else {
        const searchSource = (item.searchText || item.label).toLowerCase();
        if (searchSource.includes(lowerTerm)) {
          acc.push(item);
        }
      }
      return acc;
    }, []);
  }, [options, searchTerm]);

  const handleSelect = (option: SelectOption) => {
    if (disabled || option.disabled) return;

    if (isMulti) {
      const currentValues = (value as SelectOption[]) || [];
      const isSelected = currentValues.some(v => v.value === option.value);

      let newValues;
      if (isSelected) {
        newValues = currentValues.filter(v => v.value !== option.value);
      } else {
        newValues = [...currentValues, option];
      }
      onChange(newValues);
      setSearchTerm("");
      inputRef.current?.focus();
    } else {
      onChange(option);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  // CHIP SİLME (Multi)
  const removeChip = (e: React.MouseEvent, optionValue: string | number) => {
    e.stopPropagation();
    if (!isMulti || !Array.isArray(value)) return;
    onChange(value.filter(v => v.value !== optionValue));
  };

  // TEMİZLEME (Clear All)
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(isMulti ? [] : null);
    setSearchTerm("");
  };

  // VALUE KONTROLÜ (Seçili mi?)
  const isSelected = (option: SelectOption) => {
    if (isMulti && Array.isArray(value)) {
      return value.some(v => v.value === option.value);
    }
    return (value as SelectOption)?.value === option.value;
  };

  // RENDER HELPER: Option Listesi
  const renderOptionLabel = (option: SelectOption) => (
    <span className={styles.optionLabel}>
      {option.icon ? <span className={styles.optionIcon}>{option.icon}</span> : null}
      <span>{option.label}</span>
    </span>
  );

  const renderOption = (option: SelectOption) => (
    <div
      key={option.value}
      className={`${styles.option} ${isSelected(option) ? styles.selected : ''} ${option.disabled ? styles.disabledOption : ''}`}
      onClick={() => handleSelect(option)}
      role="option"
      aria-selected={isSelected(option)}
      aria-disabled={option.disabled || undefined}
    >
      {renderOptionLabel(option)}
      {isLiteMulti && isSelected(option) && <Icon icon={Check} size={16} className={styles.checkIcon} decorative />}
    </div>
  );

  const selectedSingle = !isMulti && value && !Array.isArray(value) ? value as SelectOption : null;

  return (
    <div
      ref={containerRef}
      className={clsx(
        styles.container,
        styles[size],
        styles[variant],
        disabled && styles.disabled,
        error && styles.error,
        isOpen && styles.open,
        isFloating && hasSelection && styles.hasValue,
        className
      )}
    >
      {label && !isFloating && <label htmlFor={uniqueId} className={styles.label}>{label}</label>}

      {/* CONTROL BOX (Input Alanı) */}
      <div
        className={styles.control}
        onClick={() => !disabled && setIsOpen(prev => !prev)}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={menuId}
        aria-invalid={!!error}
        aria-describedby={errorId}
      >
        {isFloating && <label htmlFor={uniqueId} className={styles.floatingLabel}>{label}</label>}

        <div className={styles.valueContainer}>
          {/* MULTI: Chips */}
          {isMulti && !isLiteMulti && selectedValues.map(val => (
            <span key={val.value} className={styles.chip}>
              {val.label}
              <button
                type="button"
                className={styles.chipRemove}
                onClick={(e) => removeChip(e, val.value)}
                aria-label={`${val.label} seçimini kaldır`}
              >
                <Icon icon={X} size={14} decorative />
              </button>
            </span>
          ))}

          {isLiteMulti && !searchTerm && liteSummaryText && (
            <span className={styles.liteSummary}>{liteSummaryText}</span>
          )}

          {selectedSingle && !searchTerm && (
            <span className={styles.singleValue}>{renderOptionLabel(selectedSingle)}</span>
          )}


          {(placeholder || isSearchable) &&
            (
              <input
                ref={inputRef}
                id={uniqueId}
                type="text"
                className={styles.input}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (!isOpen) setIsOpen(true);
                }}
                placeholder={
                  (isMulti && (value as SelectOption[])?.length > 0) || (isFloating && !hasSelection)
                    ? ""
                    : (!isMulti && value && !searchTerm)
                      ? (value as SelectOption).label
                      : placeholder
                }
                readOnly={!isSearchable} // Search kapalıysa klavye açılmasın
                disabled={disabled}
                role="searchbox"
                aria-controls={menuId}
                aria-describedby={errorId}
                aria-invalid={!!error}
              />
            )}

        </div>

        {/* INDICATORS (Sağ Taraf) */}
        <div className={styles.indicators}>
          {isClearable && value && (
            (Array.isArray(value) ? value.length > 0 : true)
          ) && (
              <button type="button" className={styles.indicator} onClick={handleClear} aria-label="Seçimi temizle">
                <Icon icon={X} size={16} decorative />
              </button>
            )}
          {variant !== 'lite' && (
            <>
              <div className={styles.separator} />
              <div className={styles.indicator} aria-hidden="true">
                {isLoading ? <Icon icon={Loader} size={16} className={styles.spinner} decorative /> : <Icon icon={ChevronDown} size={16} decorative />}
              </div>
            </>
          )}

        </div>
      </div>

      {/* MENU (Dropdown) */}
      {isOpen && !disabled && (
        <div className={styles.menu} id={menuId} role="listbox" aria-multiselectable={isMulti || undefined}>
          {filteredOptions.length === 0 ? (
            <div className={styles.noOptions}>No options found</div>
          ) : (
            filteredOptions.map((item, index) => {
              if (isGroup(item)) {
                return (
                  <div key={index} className={styles.group}>
                    <div className={styles.groupLabel}>{item.label}</div>
                    {item.options.map(renderOption)}
                  </div>
                );
              }
              return renderOption(item);
            })
          )}
        </div>
      )}

      {typeof error === 'string' && <span id={errorId} className={styles.errorMessage} role="alert" aria-live="polite">{error}</span>}
    </div>
  );
};