import { Footer } from '../footer';
import { Header } from '../header';
import { Sidebar } from '../sidebar';

import { BreadCrumbs } from '@/components/layout/bread-crumbs';

import styles from './app-layout.module.scss';
import { clsx } from '@/utils';

export function AppLayout({
  children,
  initialOpenGroups,
}: {
  children: React.ReactNode;
  initialOpenGroups: string[];
}) {
  return (
    <div className={styles.root}>
      <a href="#main-content" className={styles.skipLink}>İçeriğe geç</a>
      <Header />
      <Sidebar initialOpenGroups={initialOpenGroups} />

      <main id="main-content" className={clsx('layout-main', styles.main)}>
        <BreadCrumbs />
        <div className={styles.page}>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
