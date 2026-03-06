'use client';

import { Icon } from '@/components/ui/icon';
import XIcon from '@/components/ui/icon/icons/X';
import { clsx } from '@/utils';
import {
  ModalHostProps,
  ModalItem,
  ModalPosition,
  ModalSize,
  ModalVariant,
} from '@/context/modal/modal.types';
import styles from './modal.module.scss';

const variantClassMap: Record<ModalVariant, string> = {
  default: 'variantDefault',
  elevated: 'variantElevated',
  glass: 'variantGlass',
};

const sizeClassMap: Record<ModalSize, string> = {
  sm: 'sizeSm',
  md: 'sizeMd',
  lg: 'sizeLg',
  xl: 'sizeXl',
  full: 'sizeFull',
};

const positionClassMap: Record<ModalPosition, string> = {
  center: 'positionCenter',
  top: 'positionTop',
  bottom: 'positionBottom',
  left: 'positionLeft',
  right: 'positionRight',
};

interface ModalProps {
  modal: ModalItem;
  zIndex?: number;
  onClose: (id: string) => void;
}

export function Modal({ modal, zIndex = 1300, onClose }: ModalProps) {
  return (
    <div className={styles.modalRoot} style={{ zIndex }}>
      {modal.withBackdrop ? (
        <button
          type="button"
          className={styles.backdrop}
          onClick={modal.closeOnBackdropClick ? () => onClose(modal.id) : undefined}
          aria-label="Close modal backdrop"
        />
      ) : null}

      <div className={clsx(styles.positionWrap, styles[positionClassMap[modal.position]])}>
        <section
          role="dialog"
          aria-modal="true"
          aria-label={modal.title || 'Modal'}
          className={clsx(
            styles.modal,
            styles[variantClassMap[modal.variant]],
            styles[sizeClassMap[modal.size]],
          )}
        >
          {(modal.title || modal.description || modal.dismissible) ? (
            <header className={styles.header}>
              <div className={styles.titleGroup}>
                {modal.title ? <h3 className={styles.title}>{modal.title}</h3> : null}
                {modal.description ? <p className={styles.description}>{modal.description}</p> : null}
              </div>

              {modal.dismissible ? (
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => onClose(modal.id)}
                  aria-label="Close modal"
                >
                  <Icon icon={XIcon} size={16} decorative />
                </button>
              ) : null}
            </header>
          ) : null}

          <div className={styles.content}>{modal.content}</div>
        </section>
      </div>
    </div>
  );
}

export function ModalHost({ modals, onClose }: ModalHostProps) {
  if (!modals.length) {
    return null;
  }

  return (
    <div className={styles.layer} aria-live="polite" aria-atomic="true">
      {modals.map((modal, index) => {
        const zOffset = index * 2;

        return <Modal key={modal.id} modal={modal} zIndex={1300 + zOffset} onClose={onClose} />;
      })}
    </div>
  );
}
