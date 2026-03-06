'use client';

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { clsx } from '@/utils';
import { useClickOutside } from '@/hooks';
import { TooltipProps } from './tooltip.types';
import styles from './tooltip.module.scss';

export function Tooltip({
  children,
  content,
  className,
  contentClassName,
  variant = 'dark',
  position = 'top',
  align = 'center',
  trigger = 'hover',
  delay = 120,
  withArrow = true,
  disabled = false,
  keepMounted = false,
  maxWidth,
  open,
  defaultOpen = false,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
  tooltipStyle,
}: TooltipProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const tooltipId = useId();

  const isControlled = typeof open === 'boolean';
  const isOpen = isControlled ? Boolean(open) : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const clearTimers = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const openWithDelay = useCallback(() => {
    clearTimers();

    if (delay <= 0) {
      setOpen(true);
      return;
    }

    openTimeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, delay);
  }, [clearTimers, delay, setOpen]);

  const closeWithDelay = useCallback(() => {
    clearTimers();

    if (delay <= 0) {
      setOpen(false);
      return;
    }

    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, delay / 1.4);
  }, [clearTimers, delay, setOpen]);

  const handleMouseEnter = () => {
    if (disabled || trigger !== 'hover') {
      return;
    }
    openWithDelay();
  };

  const handleMouseLeave = () => {
    if (disabled || trigger !== 'hover') {
      return;
    }
    closeWithDelay();
  };

  const handleFocus = () => {
    if (disabled || trigger === 'manual') {
      return;
    }
    openWithDelay();
  };

  const handleBlur = () => {
    if (disabled || trigger === 'manual') {
      return;
    }
    closeWithDelay();
  };

  const handleClick = () => {
    if (disabled || trigger !== 'click') {
      return;
    }
    clearTimers();
    setOpen(!isOpen);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLSpanElement> = (event) => {
    if (event.key === 'Escape' && closeOnEscape) {
      clearTimers();
      setOpen(false);
      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && trigger === 'click') {
      event.preventDefault();
      handleClick();
    }
  };

  useClickOutside(rootRef as React.RefObject<HTMLElement>, () => {
    if (!closeOnClickOutside || trigger !== 'click' || !isOpen) {
      return;
    }

    clearTimers();
    setOpen(false);
  });

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const computedStyle = useMemo(() => {
    return {
      ...(tooltipStyle ?? {}),
      ...(maxWidth ? { maxWidth } : {}),
    };
  }, [maxWidth, tooltipStyle]);

  const shouldRender = keepMounted || isOpen;

  return (
    <span
      ref={rootRef}
      className={clsx(styles.root, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <span
        className={styles.trigger}
        onClick={handleClick}
        tabIndex={trigger === 'click' ? 0 : undefined}
        aria-describedby={isOpen ? tooltipId : undefined}
      >
        {children}
      </span>

      {shouldRender ? (
        <span
          id={tooltipId}
          role="tooltip"
          className={clsx(
            styles.tooltip,
            styles[variant],
            styles[position],
            styles[align],
            isOpen ? styles.open : styles.hidden,
            contentClassName,
          )}
          style={computedStyle}
          aria-hidden={!isOpen}
        >
          {content}
          {withArrow ? <span className={styles.arrow} /> : null}
        </span>
      ) : null}
    </span>
  );
}
