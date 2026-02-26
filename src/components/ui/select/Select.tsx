"use client";
// src/components/ui/select/Select.tsx
import React, { useState, useRef, useId, useMemo, useEffect } from 'react';
import ChevronDown from '@/components/ui/icon/icons/ChevronDown';
import X from '@/components/ui/icon/icons/X';
import Check from '@/components/ui/icon/icons/Check';
import Loader from '@/components/ui/icon/icons/Loader';
import { useClickOutside } from '@/hooks/useClickOutside';
import { SelectProps, SelectOption, SelectGroup } from './select.types';
import styles from './select.module.scss';
import { Icon } from '../icon';

// Type Guard: Bir item'ın Group olup olmadığını anlar
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
  placeholder = "Select...",
  error = false,
  disabled = false,
  size = 'md',
  className = ''
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const uniqueId = useId();

  // Dışarı tıklayınca kapat
  useClickOutside(containerRef as React.RefObject<HTMLDivElement>, () => setIsOpen(false));

  // ARAMA VE FİLTRELEME MANTIĞI
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;

    const lowerTerm = searchTerm.toLowerCase();

    return options.reduce((acc: (SelectOption | SelectGroup)[], item) => {
      if (isGroup(item)) {
        // Grup içindeki optionları filtrele
        const filteredGroupOptions = item.options.filter(opt => 
          opt.label.toLowerCase().includes(lowerTerm)
        );
        // Eğer grupta eşleşen varsa grubu ve eşleşenleri ekle
        if (filteredGroupOptions.length > 0) {
          acc.push({ ...item, options: filteredGroupOptions });
        }
      } else {
        // Düz option kontrolü
        if (item.label.toLowerCase().includes(lowerTerm)) {
          acc.push(item);
        }
      }
      return acc;
    }, []);
  }, [options, searchTerm]);

  // SEÇİM MANTIĞI
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
      setSearchTerm(""); // Aramayı temizle
      inputRef.current?.focus(); // Focus inputta kalsın
    } else {
      onChange(option);
      setIsOpen(false); // Tekli seçimde kapat
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
  const renderOption = (option: SelectOption) => (
    <div
      key={option.value}
      className={`${styles.option} ${isSelected(option) ? styles.selected : ''} ${option.disabled ? styles.disabledOption : ''}`}
      onClick={() => handleSelect(option)}
    >
      <span>{option.label}</span>
      {isSelected(option) && <Icon icon={Check} size={16} className={styles.checkIcon} />}
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className={[
        styles.container, 
        styles[size], 
        disabled ? styles.disabled : '',
        error ? styles.error : '',
        isOpen ? styles.open : '',
        className
      ].join(' ')}
    >
      {label && <label htmlFor={uniqueId} className={styles.label}>{label}</label>}

      {/* CONTROL BOX (Input Alanı) */}
      <div 
        className={styles.control} 
        onClick={() => !disabled && setIsOpen(prev => !prev)}
      >
        <div className={styles.valueContainer}>
          {/* MULTI: Chips */}
          {isMulti && Array.isArray(value) && value.map(val => (
            <span key={val.value} className={styles.chip}>
              {val.label}
              <Icon
                icon={X}
                size={14} 
                className={styles.chipRemove} 
                onClick={(e) => removeChip(e, val.value)} 
              />
            </span>
          ))}

          {/* INPUT & PLACEHOLDER */}
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
              (isMulti && (value as SelectOption[])?.length > 0) 
                ? "" 
                : (!isMulti && value && !searchTerm) 
                  ? (value as SelectOption).label 
                  : placeholder
            }
            readOnly={!isSearchable} // Search kapalıysa klavye açılmasın
            disabled={disabled}
          />
        </div>

        {/* INDICATORS (Sağ Taraf) */}
        <div className={styles.indicators}>
          {isClearable && value && (
             (Array.isArray(value) ? value.length > 0 : true)
          ) && (
            <div className={styles.indicator} onClick={handleClear}>
              <Icon icon={X} size={16} />
            </div>
          )}
          <div className={styles.separator} />
          <div className={styles.indicator}>
            {isLoading ? <Icon icon={Loader} size={16} className={styles.spinner} /> : <Icon icon={ChevronDown} size={16} />}
          </div>
        </div>
      </div>

      {/* MENU (Dropdown) */}
      {isOpen && !disabled && (
        <div className={styles.menu}>
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
      
      {typeof error === 'string' && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};