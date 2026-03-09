"use client";

import { RefObject, useEffect, useId, useRef, useState } from 'react';
import ChevronDown from '@/components/ui/icon/icons/ChevronDown';
import Check from '@/components/ui/icon/icons/Check';
import { useClickOutside } from '@/hooks/useClickOutside';
import { clsx } from '@/utils';
import { Button } from '../button';
import { Icon } from '../icon';
import { DropdownItem, DropdownProps } from './dropdown.types';
import styles from './dropdown.module.scss';

export const Dropdown = ({
  items = [],
  triggerLabel,
  label,
  size = 'md',
  align = 'start',
  className,
  triggerClassName,
  menuClassName,
  triggerVariant = 'outline',
  triggerColor = 'neutral',
  disabled = false,
  closeOnSelect = true,
  selectedItemId,
  isOpen: controlledIsOpen,
  onOpenChange,
  content,
  menuRole,
  onSelect,
}: DropdownProps) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonId = useId();
  const menuId = `${buttonId}-menu`;
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  const resolvedMenuRole = menuRole ?? (content ? 'dialog' : 'menu');

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledIsOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  useClickOutside(rootRef as RefObject<HTMLDivElement>, () => setOpen(false));

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
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
      setOpen(false);
    }
  };

  const renderedContent = typeof content === 'function'
    ? content({ close: () => setOpen(false), isOpen })
    : content;

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

      <Button
        id={buttonId}
        type="button"
        size={size}
        variant={triggerVariant}
        color={triggerColor}
        className={clsx(styles.trigger, triggerClassName)}
        disabled={disabled}
        aria-haspopup={resolvedMenuRole}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setOpen(!isOpen)}
        rightIcon={
          <Icon
            icon={ChevronDown}
            size={16}
            className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
            decorative
          />
        }
      >
        <span className={styles.triggerLabel}>{triggerLabel}</span>
      </Button>

      {isOpen && !disabled ? (
        <div
          id={menuId}
          className={clsx(styles.menu, menuClassName)}
          role={resolvedMenuRole}
          aria-labelledby={buttonId}
        >
          {renderedContent ? renderedContent : items.map((item) => {
            const isSelected = selectedItemId !== undefined && selectedItemId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                role={resolvedMenuRole === 'menu' ? 'menuitem' : undefined}
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
