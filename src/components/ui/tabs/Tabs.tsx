"use client";

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Tab } from './tabs.types';
import styles from './tabs.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';

interface TabsProps {
  tabs: Tab[];
  children?: React.ReactNode;
}

export default function Tabs({ tabs, children }: TabsProps) {
  const selectedSegment = useSelectedLayoutSegment();
  const listRef = useRef<HTMLUListElement>(null);

  const [indicator, setIndicator] = useState({
    left: '0px',
    width: '0px',
    top: '8px',
    height: '36px',
  });

  const updateIndicator = useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const activeIndex = tabs.findIndex(
      tab => (tab.segment ?? 'overview') === (selectedSegment ?? 'overview')
    );
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
  }, [selectedSegment, tabs]);

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

          {tabs.map((tab) => {
            const isActive =
              (tab.segment ?? 'overview') ===
              (selectedSegment ?? 'overview');

            return (
              <li key={tab.id} className={styles.item}>
                <Link
                  href={tab.href}
                  className={styles.link}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <section className={styles.content}>
        {children}
      </section>
    </div>
  );
}
