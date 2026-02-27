'use client';

import { usePathname } from 'next/navigation';
import { resolveRouteByPathname } from '@/utils';
import styles from './header.module.scss';

export function Header() {
  const pathname = usePathname();
  const route = resolveRouteByPathname(pathname);
  const title = route?.title;

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
         {title && <p aria-live="polite">{title}</p>}
      </div>
    </header>
  );
}
