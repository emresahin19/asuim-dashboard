import { clsx } from '@/utils/clsx';
import styles from './footer.module.scss';

export function Footer({
  isOpen,
}: {
  isOpen: boolean;
}) {
  return (
    <footer className={clsx(styles.root, isOpen && styles.sidebarOpen)}>
      <div className={styles.inner}>Footer</div>
    </footer>
  );
}
