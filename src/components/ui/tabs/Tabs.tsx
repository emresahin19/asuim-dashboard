"use client";

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { clsx } from '@/utils';
import { Tab } from './tabs.types';
import styles from './tabs.module.scss';

interface TabsProps {
  tabs: Tab[];
  children?: React.ReactNode;
}

export default function Tabs({ tabs, children }: TabsProps) {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {tabs.map((tab) => {
            const isActive =
              (tab.segment ?? "overview") === (selectedSegment ?? "overview");

            return (
              <li key={tab.id} className={styles.item}>
                <Link
                  href={tab.href}
                  className={clsx(styles.link)}
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