import { clsx } from '@/utils'
import styles from './card.module.scss'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'gradient'
}

export function Card({ children, className, variant = 'default', ...rest }: CardProps) {
  return (
    <div className={clsx(styles.root, styles[variant], className)} {...rest}>
      {children}
    </div>
  )
}
