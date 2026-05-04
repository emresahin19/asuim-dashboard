import styles from './studio-layout.module.scss';

export default function StudioGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      {children}
    </div>
  );
}
