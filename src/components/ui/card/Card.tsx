import { clsx } from '@/utils'
import styles from './card.module.scss'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <div className={clsx(styles.root, className)} {...rest}>
      {children}
    </div>
  )
}
