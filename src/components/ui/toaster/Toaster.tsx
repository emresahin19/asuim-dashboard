import { Icon } from '@/components/ui/icon';
import CircleCheck from '@/components/ui/icon/icons/CircleCheck';
import CircleAlert from '@/components/ui/icon/icons/CircleAlert';
import CircleX from '@/components/ui/icon/icons/CircleX';
import Info from '@/components/ui/icon/icons/Info';
import Bell from '@/components/ui/icon/icons/Bell';
import X from '@/components/ui/icon/icons/X';
import { clsx } from '@/utils';
import { ToastPosition, ToasterViewportProps } from '@/context';
import styles from './toaster.module.scss';

const positions: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const positionClassMap: Record<ToastPosition, string> = {
  'top-left': 'positionTopLeft',
  'top-center': 'positionTopCenter',
  'top-right': 'positionTopRight',
  'bottom-left': 'positionBottomLeft',
  'bottom-center': 'positionBottomCenter',
  'bottom-right': 'positionBottomRight',
};

const toneClassMap = {
  default: 'toneDefault',
  info: 'toneInfo',
  success: 'toneSuccess',
  warning: 'toneWarning',
  danger: 'toneDanger',
} as const;

const variantClassMap = {
  soft: 'variantSoft',
  solid: 'variantSolid',
  outline: 'variantOutline',
} as const;

const toneIconMap = {
  default: Bell,
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  danger: CircleX,
} as const;

export function Toaster({ toasts, onDismiss }: ToasterViewportProps) {
  if (!toasts.length) {
    return null;
  }

  return (
    <div className={styles.layer} aria-live="polite" aria-atomic="false">
      {positions.map((position) => {
        const items = toasts.filter((toast) => toast.position === position);

        if (!items.length) {
          return null;
        }

        return (
          <div
            key={position}
            className={clsx(styles.viewport, styles[positionClassMap[position]])}
          >
            {items.map((toast) => {
              const IconComponent = toneIconMap[toast.tone];

              return (
                <article
                  key={toast.id}
                  className={clsx(
                    styles.toast,
                    styles[toneClassMap[toast.tone]],
                    styles[variantClassMap[toast.variant]],
                  )}
                  role={toast.tone === 'danger' || toast.tone === 'warning' ? 'alert' : 'status'}
                >
                  <div className={styles.iconWrap}>
                    <Icon icon={IconComponent} size={18} decorative />
                  </div>

                  <div className={styles.content}>
                    {toast.title ? <strong className={styles.title}>{toast.title}</strong> : null}
                    <p className={styles.message}>{toast.message}</p>
                  </div>

                  {toast.dismissible ? (
                    <button
                      type="button"
                      className={styles.closeButton}
                      onClick={() => onDismiss(toast.id)}
                      aria-label="Close notification"
                    >
                      <Icon icon={X} size={14} decorative />
                    </button>
                  ) : null}
                </article>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
