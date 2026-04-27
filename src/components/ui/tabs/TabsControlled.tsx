"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import type { SpinnerName } from '@/components/ui/spinner/spinner.types';
import type { ControlledTab } from './tabs.types';
import styles from './tabs.module.scss';
import controlledStyles from './tabs-controlled.module.scss';

interface TabsControlledProps {
  tabs: ControlledTab[];
  activeId?: string;
  onTabChange?: (id: string) => void;
  loadingDelay?: number;
  spinnerName?: SpinnerName;
  children?: React.ReactNode;
}

export function TabsControlled({
  tabs,
  activeId,
  onTabChange,
  loadingDelay = 600,
  spinnerName = 'dots',
  children,
}: TabsControlledProps) {
  const [active, setActive] = useState(activeId ?? tabs[0]?.id ?? '');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [indicator, setIndicator] = useState({
    left: '0px',
    width: '0px',
    top: '8px',
    height: '36px',
  });

  const updateIndicator = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const activeIndex = tabs.findIndex((t) => t.id === active);
    const items = list.querySelectorAll<HTMLLIElement>(':scope > li');
    const activeItem = items[activeIndex];
    if (activeItem) {
      setIndicator({
        left: `${activeItem.offsetLeft + 8}px`,
        width: `${activeItem.offsetWidth - 16}px`,
        top: `${activeItem.offsetTop}px`,
        height: `${activeItem.offsetHeight}px`,
      });
    }
  }, [active, tabs]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(updateIndicator);
    observer.observe(list);
    return () => observer.disconnect();
  }, [updateIndicator]);

  useEffect(() => {
    if (activeId !== undefined) setActive(activeId);
  }, [activeId]);

  const handleSelect = useCallback(
    (id: string) => {
      if (id === active) return;
      setActive(id);
      onTabChange?.(id);

      if (loadingDelay > 0) {
        setLoading(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setLoading(false), loadingDelay);
      }
    },
    [active, loadingDelay, onTabChange],
  );

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <ul ref={listRef} className={styles.list}>
          <div
            className={styles.slider}
            style={{
              left: indicator.left,
              width: indicator.width,
              top: indicator.top,
              height: indicator.height,
            }}
          />
          {tabs.map((tab) => (
            <li key={tab.id} className={styles.item}>
              <button
                type="button"
                className={`${styles.link} ${controlledStyles.btn}`}
                aria-current={tab.id === active ? 'page' : undefined}
                onClick={() => handleSelect(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section className={`${styles.content} ${controlledStyles.contentWrap}`}>
        {loading && (
          <div className={controlledStyles.loadingOverlay}>
            <Spinner name={spinnerName} size={22} />
          </div>
        )}
        <div className={loading ? controlledStyles.contentBlurred : undefined}>
          {children}
        </div>
      </section>
    </div>
  );
}
