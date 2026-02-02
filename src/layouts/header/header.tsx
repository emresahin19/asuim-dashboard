import { clsx } from '@/utils/clsx';
import styles from './header.module.scss';
import { useRoute } from '@/context/route/RouteContext';

export function Header() {
  const { title } = useRoute();

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
         {title && <h1>{title}</h1>}
      </div>
    </header>
  );
}
