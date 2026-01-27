import { clsx } from '@/utils/clsx';
import styles from './header.module.scss';
import { Hamburger } from '@/components/ui/hamburger-button';

export function Header({
  onToggleSidebar,
  isOpen,
}: {
  onToggleSidebar: () => void;
  isOpen: boolean;
}) {
  return (
    <header className={clsx(styles.root, isOpen && styles.sidebarOpen)}>
      <Hamburger
        isActive={isOpen}
        variant="Hamburger2"
        onClick={onToggleSidebar}
      />
    </header>
  );
}
