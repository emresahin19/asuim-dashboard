import styles from './header.module.scss';

export function Header({ title }: { title?: string }) {
  return (
    <header className={styles.root}>
      <div className={styles.inner}>
         {title && <h1>{title}</h1>}
      </div>
    </header>
  );
}
