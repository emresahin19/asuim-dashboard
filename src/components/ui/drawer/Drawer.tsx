'use client';

import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { clsx } from '@/utils';
import { Icon } from '@/components/ui/icon';
import XIcon from '@/components/ui/icon/icons/X';
import { DrawerProps } from './drawer.types';
import styles from './drawer.module.scss';
import { useClickOutside } from '@/hooks';

export function Drawer({
  isOpen,
  onClose,
  header,
  position = 'right',
  withBackdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  headerActions,
  children,
  className,
  bodyClassName,
  drawerStyle,
  ...rest
}: DrawerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef as React.RefObject<HTMLDivElement>, () => onClose?.());

  useEffect(() => {
    if (!isOpen || !closeOnEscape || !onClose) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEscape, isOpen, onClose]);

  return (
    <>
      {withBackdrop && (
        <button
          type="button"
          className={clsx(styles.backdrop, isOpen && styles.backdropOpen)}
          aria-hidden={!isOpen}
          tabIndex={isOpen ? 0 : -1}
          onClick={closeOnBackdropClick ? onClose : undefined}
        />
      )}

      <aside
        {...rest}
        ref={containerRef}
        className={clsx(
          styles.root,
          styles[position],
          isOpen && styles.open,
          className,
        )}
        style={drawerStyle}
        aria-hidden={!isOpen}
      >
        <header className={styles.header}>
          <div className={styles.titleWrap}>
            {header}
          </div>

          <div className={styles.actions}>
            {headerActions}
            {showCloseButton && onClose ? (
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close drawer"
              >
                <Icon icon={XIcon} size={16} decorative />
              </button>
            ) : null}
          </div>
        </header>

        <div className={clsx(styles.body, bodyClassName)}>{children}</div>
      </aside>
    </>
  );
}
