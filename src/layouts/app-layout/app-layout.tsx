"use client";
import { useEffect, useState } from 'react';
import { Header } from '@/layouts/header';
import { Sidebar } from '@/layouts/sidebar';
import styles from './app-layout.module.scss';
import { clsx } from '@/utils/clsx';
import { Footer } from '../footer';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [sidebarOpen]);

  return (
    <div className={clsx(styles.root, sidebarOpen && styles.sidebarOpenRoot)}>
      <Header
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        isOpen={sidebarOpen}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main
        className={clsx(
          styles.main,
          sidebarOpen && styles.sidebarOpen,
        )}
      >
        <div className={styles.content}>
          {children}
        </div>
      </main>
      <Footer isOpen={sidebarOpen} />
    </div>
  );
}
