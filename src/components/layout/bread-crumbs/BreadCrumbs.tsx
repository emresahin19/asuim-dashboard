'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { resolveBreadcrumbs } from '@/utils';

import styles from './bread-crumbs.module.scss';

export function BreadCrumbs() {
  const pathname = usePathname();
  const breadcrumbs = resolveBreadcrumbs(pathname);

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
