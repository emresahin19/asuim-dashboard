"use client";

import React, { useEffect, useId, useState, useRef, useMemo } from 'react';
import { format } from 'date-fns';
import { tr } from "date-fns/locale";
import { DayPicker, DateRange } from 'react-day-picker';

import styles from './date-picker.module.scss';
import { DatePickerProps } from './date-picker.types';

import { useClickOutside } from '@/hooks';
import { Icon } from '@/components';

import CalendarIcon from '@/components/ui/icon/icons/Calendar';
import X from '@/components/ui/icon/icons/X';
import { clsx } from '@/utils';

export const DatePicker = ({
  mode = 'single',
  value,
  onChange,
  label,
  ariaLabel,
  placeholder = "Tarih seçiniz",
  error = false,
  disabled = false,
  fullWidth = false,
  className = '',
  minDate,
  maxDate,
  showPresets = false,
  startYear = 1940, 
  endYear = new Date().getFullYear() + 5
}: DatePickerProps) => {
  
  const generatedId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputId = `${generatedId}-input`;
  const popoverId = `${generatedId}-popover`;
  const errorId = typeof error === 'string' ? `${generatedId}-error` : undefined;

  const resolveMonthFromValue = (input: Date | DateRange | undefined): Date => {
    if (!input) return new Date();
    if (input instanceof Date) return input;
    return input.to ?? input.from ?? new Date();
  };

  const [displayMonth, setDisplayMonth] = useState<Date>(() => resolveMonthFromValue(value));

  useClickOutside(containerRef as React.RefObject<HTMLDivElement>, () => setIsOpen(false));

  const displayValue = useMemo(() => {
    if (!value) return "";

    if (mode === 'range') {
      const range = value as DateRange;
      if (range?.from) {
        if (range.to) {
          // Örn: 10 Oca - 15 Şub 2024
          return `${format(range.from, 'dd MMM', { locale: tr })} - ${format(range.to, 'dd MMM yyyy', { locale: tr })}`;
        }
        return format(range.from, 'dd MMM yyyy', { locale: tr });
      }
      return "";
    }

    return format(value as Date, 'dd MMMM yyyy', { locale: tr });
  }, [value, mode]);

  useEffect(() => {
    if (isOpen) {
      setDisplayMonth(resolveMonthFromValue(value));
    }
  }, [isOpen, value]);

  // --- HANDLERS ---
  const handleSelect = (val: Date | DateRange | undefined) => {
    if (onChange) onChange(val);

    if (val instanceof Date) {
      setDisplayMonth(val);
    } else if (val) {
      const nextMonth = val.to ?? val.from;
      if (nextMonth) setDisplayMonth(nextMonth);
    }

    if (mode === 'single' && val) setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange?.(undefined);
  };

  const applyPreset = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    onChange?.({ from: start, to: end } as DateRange);
    setIsOpen(false);
  };

  const containerClasses = clsx(
    styles.container,
    isOpen ? styles.open : '',
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    fullWidth ? styles.fullWidth : '',
    className
  );

  return (
    <div ref={containerRef} className={containerClasses}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}

      {/* TRIGGER INPUT */}
      <div
        className={styles.trigger}
        onClick={() => !disabled && setIsOpen(true)}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={popoverId}
        aria-disabled={disabled || undefined}
        onKeyDown={(event) => {
          if (disabled) return;
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsOpen(true);
          }
          if (event.key === 'Escape') {
            setIsOpen(false);
          }
        }}
      >
        <Icon icon={CalendarIcon} size={18} className={styles.icon} decorative />

        <input
          id={inputId}
          className={clsx(styles.triggerInput, !displayValue && styles.placeholder)}
          readOnly
          value={displayValue || placeholder}
          onFocus={() => !disabled && setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={popoverId}
          aria-label={label || ariaLabel || placeholder}
          aria-invalid={!!error}
          aria-describedby={errorId}
        />

        {displayValue && !disabled && (
          <button type="button" className={styles.clearBtn} onClick={handleClear} aria-label="Tarihi temizle">
            <Icon icon={X} size={14} decorative />
          </button>
        )}
      </div>

      {/* POPOVER CALENDAR */}
      {isOpen && !disabled && (
        <div className={styles.popover} id={popoverId} role="dialog" aria-modal="false" aria-label="Tarih seçici">
          {showPresets && mode === 'range' && (
            <div className={styles.presets}>
              <button type="button" onClick={() => applyPreset(0)}>Bugün</button>
              <button type="button" onClick={() => applyPreset(7)}>Son 7 Gün</button>
              <button type="button" onClick={() => applyPreset(30)}>Son 30 Gün</button>
              <button type="button" onClick={() => applyPreset(90)}>Son 3 Ay</button>
            </div>
          )}

          <div className={styles.calendarWrapper}>
            <DayPicker
              locale={tr}
              mode={mode as any}
              selected={value}
              onSelect={handleSelect}
              disabled={disabled}
              fromDate={minDate}
              toDate={maxDate}
              
              // UX MAGIC: DROPDOWN NAVIGASYON
              captionLayout="dropdown" 
              fromYear={startYear}
              toYear={endYear}
              month={displayMonth}
              onMonthChange={setDisplayMonth}
              
              showOutsideDays
              numberOfMonths={1}
              
              classNames={{
                root: styles.rdpRoot,
                months: styles.rdpMonths,
                month: styles.rdpMonth,
                month_grid: styles.rdpMonthGrid,
                caption_label: styles.rdpCaptionLabel,
                dropdown: styles.rdpDropdown, // Native Select stili
                dropdowns: styles.rdpDropdowns, // Dropdown'ları saran container
                dropdown_month: styles.rdpDropdownMonth,
                dropdown_year: styles.rdpDropdownYear,
                nav: styles.rdpNav,
                button_previous: styles.rdpNavButton,
                button_next: styles.rdpNavButton,
                chevron: styles.rdpChevron,
                weekdays: styles.rdpWeekdays,
                weekday: styles.rdpWeekday,
                weeks: styles.rdpWeeks,
                week: styles.rdpWeek,
                day: styles.rdpDayCell,
                day_button: styles.rdpDayButton,
                selected: styles.rdpSelected,
                today: styles.rdpToday,
                outside: styles.rdpOutside,
                disabled: styles.rdpDisabled,
                range_middle: styles.rdpRangeMiddle,
                range_start: styles.rdpRangeStart,
                range_end: styles.rdpRangeEnd,
              }}
            />
          </div>
        </div>
      )}
      {typeof error === 'string' && <span id={errorId} className={styles.errorMessage} role="alert" aria-live="polite">{error}</span>}
    </div>
  );
};