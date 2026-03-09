"use client";

import { RefObject, useEffect, useId, useRef, useState } from 'react';
import ChevronDown from '@/components/ui/icon/icons/ChevronDown';
import Check from '@/components/ui/icon/icons/Check';
import { useClickOutside } from '@/hooks/useClickOutside';
import { clsx } from '@/utils';
import { Icon } from '../icon';
import { DropdownItem, DropdownProps } from './dropdown.types';
import styles from './dropdown.module.scss';

export const Dropdown = ({
  items,
  triggerLabel,
  label,
  size = 'md',
  align = 'start',
  className,
  disabled = false,
  closeOnSelect = true,
  selectedItemId,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonId = useId();
  const menuId = `${buttonId}-menu`;

  useClickOutside(rootRef as RefObject<HTMLDivElement>, () => setIsOpen(false));

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleItemSelect = (item: DropdownItem) => {
    if (item.disabled) return;
    onSelect?.(item);
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={rootRef}
      className={clsx(
        styles.container,
        styles[size],
        styles[align],
        disabled && styles.disabled,
        className,
      )}
    >
      {label ? <label htmlFor={buttonId} className={styles.label}>{label}</label> : null}

      <button
        id={buttonId}
        type="button"
        className={styles.trigger}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.triggerLabel}>{triggerLabel}</span>
        <Icon
          icon={ChevronDown}
          size={16}
          className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
          decorative
        />
      </button>

      {isOpen && !disabled ? (
        <div id={menuId} className={styles.menu} role="menu" aria-labelledby={buttonId}>
          {items.map((item) => {
            const isSelected = selectedItemId !== undefined && selectedItemId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                className={clsx(
                  styles.item,
                  item.disabled && styles.itemDisabled,
                  item.danger && styles.itemDanger,
                  isSelected && styles.itemSelected,
                )}
                disabled={item.disabled}
                onClick={() => handleItemSelect(item)}
              >
                <span className={styles.itemContent}>
                  {item.icon ? <span className={styles.itemIcon}>{item.icon}</span> : null}
                  <span>{item.label}</span>
                </span>
                {isSelected ? <Icon icon={Check} size={14} decorative /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
