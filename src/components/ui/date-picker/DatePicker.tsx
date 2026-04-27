"use client";

import React, { useEffect, useId, useState, useRef, useMemo } from 'react';
import { format } from 'date-fns';
import { enUS } from "date-fns/locale";
import { DayPicker, DateRange } from 'react-day-picker';

import styles from './date-picker.module.scss';
import { DatePickerProps } from './date-picker.types';

import { useClickOutside } from '@/hooks';
import { Icon } from '@/components/ui/icon';

import CalendarIcon from '@/components/ui/icon/icons/Calendar';
import X from '@/components/ui/icon/icons/X';
import { clsx } from '@/utils';

export const DatePicker = ({
  mode = 'single',
  value,
  onChange,
  label,
  ariaLabel,
  placeholder = "Select a date",
  error = false,
  disabled = false,
  size = 'md',
  fullWidth = false,
  className = '',
  minDate,
  maxDate,
  showPresets = false,
  startYear = 1940, 
  endYear = new Date().getFullYear() + 5
}: DatePickerProps) => {
    const triggerIconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;
    const clearIconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;

  
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
          // e.g. Jan 10 - Feb 15, 2024
          return `${format(range.from, 'dd MMM', { locale: enUS })} - ${format(range.to, 'dd MMM yyyy', { locale: enUS })}`;
        }
        return format(range.from, 'dd MMM yyyy', { locale: enUS });
      }
      return "";
    }

    return format(value as Date, 'dd MMMM yyyy', { locale: enUS });
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
    styles[size],
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
        <Icon icon={CalendarIcon} size={triggerIconSize} className={styles.icon} decorative />

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
          <button type="button" className={styles.clearBtn} onClick={handleClear} aria-label="Clear date">
            <Icon icon={X} size={clearIconSize} decorative />
          </button>
        )}
      </div>

      {/* POPOVER CALENDAR */}
      {isOpen && !disabled && (
        <div className={styles.popover} id={popoverId} role="dialog" aria-modal="false" aria-label="Date picker">
          {showPresets && mode === 'range' && (
            <div className={styles.presets}>
              <button type="button" onClick={() => applyPreset(0)}>Today</button>
              <button type="button" onClick={() => applyPreset(7)}>Last 7 Days</button>
              <button type="button" onClick={() => applyPreset(30)}>Last 30 Days</button>
              <button type="button" onClick={() => applyPreset(90)}>Last 3 Months</button>
            </div>
          )}

          <div className={styles.calendarWrapper}>
            <DayPicker
              locale={enUS}
              mode={mode as any}
              selected={value}
              onSelect={handleSelect}
              disabled={disabled}
              fromDate={minDate}
              toDate={maxDate}
              
              // UX MAGIC: DROPDOWN NAVIGATION
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
                dropdown: styles.rdpDropdown, // Native Select style
                dropdowns: styles.rdpDropdowns, // Container wrapping dropdowns
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