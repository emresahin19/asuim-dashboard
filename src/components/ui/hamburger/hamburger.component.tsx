import { clsx } from '@/utils/clsx';
import styles from './hamburger.module.scss';

export const Hamburger = () => {
    return (
        <svg className={clsx(styles.ham, styles.hamTs)} viewBox="0 0 100 100" width="80" >
            <path
                className={clsx(styles.line, styles.top)}
                d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
            <path
                className={clsx(styles.line, styles.middle)}
                d="m 70,50 h -40" />
            <path
                className={clsx(styles.line, styles.bottom)}
                d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
        </svg>
    )
};