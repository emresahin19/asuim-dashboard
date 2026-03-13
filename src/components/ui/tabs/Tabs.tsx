"use client";

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { clsx } from '@/utils';
import { Tab } from './tabs.types';
import styles from './tabs.module.scss';
import { useEffect, useRef, useState } from 'react';

interface TabsProps {
  tabs: Tab[];
  children?: React.ReactNode;
}

export default function Tabs({ tabs, children }: TabsProps) {
  const selectedSegment = useSelectedLayoutSegment();
  const listRef = useRef<HTMLUListElement>(null);

  const [indicator, setIndicator] = useState({
    left: '0',
    width: '0'
  });

  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => (tab.segment ?? "overview") === (selectedSegment ?? "overview"));
    setIndicator({
      left: `calc(${(100 / tabs.length) * (activeIndex ?? 0)}% + 8px)`,
      width: `calc(${100 / tabs.length}% - 16px)`
    });
  }, [selectedSegment]);

  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <ul ref={listRef} className={styles.list}>

          <div
            className={styles.slider}
            style={{
              left: indicator.left,
              width: indicator.width
            }}
          />

          {tabs.map((tab) => {
            const isActive =
              (tab.segment ?? "overview") ===
              (selectedSegment ?? "overview");

            return (
              <li key={tab.id} className={styles.item}>
                <Link
                  href={tab.href}
                  className={styles.link}
                  aria-current={isActive ? "page" : undefined}
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