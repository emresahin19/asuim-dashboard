'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { resolveRouteByPathname } from '@/utils/navigation';
import styles from './header.module.scss';
import DoorOpenIcon from '@/components/ui/icon/icons/DoorOpen';
import DoorClosedIcon from '@/components/ui/icon/icons/DoorClosed';
import SunIcon from '@/components/ui/icon/icons/Sun';
import MoonIcon from '@/components/ui/icon/icons/Moon';
import HouseIcon from '@/components/ui/icon/icons/House';
import { Icon } from '@/components/ui';
import { useTheme } from '@/context';
import { NotificationsButton } from './NotificationsButton';

export function Header() {
  const pathname = usePathname();
  const route = resolveRouteByPathname(pathname);
  const title = route?.title;

  const { theme, setTheme } = useTheme();
  const isDark = theme.scheme === 'dark';

  const toggleTheme = () => {
    setTheme({ scheme: isDark ? 'light' : 'dark' });
  };

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        {title && <p aria-live="polite">{title}</p>}
        <div className={styles.endButtons}>
          <NotificationsButton />

          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <Icon icon={isDark ? SunIcon : MoonIcon} size={20} decorative />
          </button>

          <button
            onClick={() => {}}
            className={styles.logoutButton}
            type="button"
            aria-label="Logout"
          >
            <Icon className={styles.doorOpen} icon={DoorOpenIcon} />
            <Icon className={styles.doorClosed} icon={DoorClosedIcon} />
          </button>
        </div>
      </div>
    </header>
  );
}
