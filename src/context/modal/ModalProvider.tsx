'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ModalContext } from './ModalContext';
import { ModalItem, ModalProviderProps, ShowModalOptions } from './modal.types';
import { ModalHost } from '@/components/ui/modal';

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalItem[]>([]);
  const counterRef = useRef(0);

  const close = useCallback((id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  const closeTop = useCallback(() => {
    setModals((prev) => {
      if (!prev.length) {
        return prev;
      }

      return prev.slice(0, -1);
    });
  }, []);

  const clear = useCallback(() => {
    setModals([]);
  }, []);

  const update = useCallback((id: string, updates: Partial<Omit<ModalItem, 'id' | 'createdAt'>>) => {
    setModals((prev) =>
      prev.map((modal) => (modal.id === id ? { ...modal, ...updates } : modal)),
    );
  }, []);

  const open = useCallback((options: ShowModalOptions) => {
    counterRef.current += 1;
    const id = `modal-${Date.now()}-${counterRef.current}`;

    const modal: ModalItem = {
      id,
      title: options.title,
      description: options.description,
      content: options.content,
      variant: options.variant ?? 'default',
      size: options.size ?? 'md',
      position: options.position ?? 'center',
      withBackdrop: options.withBackdrop ?? true,
      closeOnBackdropClick: options.closeOnBackdropClick ?? true,
      closeOnEscape: options.closeOnEscape ?? true,
      dismissible: options.dismissible ?? true,
      lockScroll: options.lockScroll ?? true,
      createdAt: Date.now(),
    };

    setModals((prev) => [...prev, modal]);

    return id;
  }, []);

  useEffect(() => {
    const topModal = modals.at(-1);

    if (!topModal?.closeOnEscape) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close(topModal.id);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close, modals]);

  useEffect(() => {
    const shouldLock = modals.some((modal) => modal.lockScroll);
    if (!shouldLock) {
      document.body.style.overflow = '';
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [modals]);

  const contextValue = useMemo(
    () => ({
      modals,
      open,
      close,
      closeTop,
      clear,
      update,
    }),
    [clear, close, closeTop, modals, open, update],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <ModalHost modals={modals} onClose={close} />
    </ModalContext.Provider>
  );
}
