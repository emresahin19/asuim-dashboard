'use client';

import { useRoute } from '@/context/route/RouteContext';
import Link from 'next/link';
import styles from './breadcrumbs.module.scss';

export function Breadcrumbs() {
  const { breadcrumbs } = useRoute();

  if (breadcrumbs.length < 2) return null;

  return (
    <nav className={styles.root} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={item.path} className={styles.item}>
              {!isLast ? (
                <Link href={item.path} className={styles.link}>
                  {item.title}
                </Link>
              ) : (
                <span>{item.title}</span>
              )}

              {!isLast && (
                <span className={styles.separator}>/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
