import { Footer } from '../footer';
import { Header } from '../header';
import { Sidebar } from '../sidebar';

import { BreadCrumbs } from '@/components';

import styles from './app-layout.module.scss';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <Header />
      <Sidebar />

      <main className={styles.main}>
        <div className={styles.content}>
          <BreadCrumbs />
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
