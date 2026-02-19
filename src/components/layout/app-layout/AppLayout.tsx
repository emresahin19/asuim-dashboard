import { Footer } from '../footer';
import { Header } from '../header';
import { Sidebar } from '../sidebar';

import { BreadCrumbs } from '@/components';

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
      <Header />
      <Sidebar initialOpenGroups={initialOpenGroups} />

      <main className={clsx('layout-main', styles.main)}>
        <BreadCrumbs />
        <div className={styles.page}>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
