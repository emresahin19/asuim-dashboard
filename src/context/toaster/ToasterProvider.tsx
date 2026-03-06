'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ToasterContext } from './ToasterContext';
import {
  ShowToastOptions,
  ToastItem,
  ToastPosition,
  ToasterProviderProps,
} from './toaster.types';
import { Toaster } from '@/components';

const DEFAULT_DURATION = 3600;
const MIN_DURATION = 2200;
const MAX_DURATION = 12000;
const CHAR_DURATION_FACTOR = 24;
const LINE_DURATION_FACTOR = 420;

function clampDuration(value: number) {
  return Math.max(MIN_DURATION, Math.min(MAX_DURATION, value));
}

function getDynamicDuration(message: string) {
  const compactMessage = message.trim();

  if (!compactMessage) {
    return DEFAULT_DURATION;
  }

  const lineCount = compactMessage
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean).length;

  const estimated =
    MIN_DURATION +
    compactMessage.length * CHAR_DURATION_FACTOR +
    Math.max(0, lineCount - 1) * LINE_DURATION_FACTOR;

  return clampDuration(estimated);
}

function normalizeMessages(message: string | string[]) {
  if (Array.isArray(message)) {
    const normalized = message.map((item) => item.trim()).filter(Boolean);
    return normalized;
  }

  const normalized = message.trim();
  return normalized ? [normalized] : [];
}

export function ToasterProvider({ children }: ToasterProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const counterRef = useRef(0);

  const remove = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }

    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  const scheduleRemoval = useCallback(
    (toast: ToastItem) => {
      if (toast.duration <= 0) {
        return;
      }

      const timer = setTimeout(() => {
        remove(toast.id);
      }, toast.duration);

      timersRef.current.set(toast.id, timer);
    },
    [remove],
  );

  const createToast = useCallback(
    (message: string, options: ShowToastOptions = {}) => {
      counterRef.current += 1;
      const id = `toast-${Date.now()}-${counterRef.current}`;
      const rawDuration = options.duration ?? getDynamicDuration(message);
      const duration = rawDuration < 0 ? 0 : rawDuration;

      const toast: ToastItem = {
        id,
        title: options.title,
        message,
        duration,
        variant: options.variant ?? 'outline',
        tone: options.tone ?? 'default',
        position: options.position ?? 'bottom-right',
        dismissible: options.dismissible ?? true,
        createdAt: Date.now(),
      };

      setToasts((prev) => [...prev, toast]);
      scheduleRemoval(toast);

      return id;
    },
    [scheduleRemoval],
  );

  const show = useCallback(
    (message: string | string[], options: ShowToastOptions = {}) => {
      const messages = normalizeMessages(message);
      return messages.map((entry) => createToast(entry, options));
    },
    [createToast],
  );

  const clear = useCallback((position?: ToastPosition) => {
    if (!position) {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
      setToasts([]);
      return;
    }

    setToasts((prev) => {
      prev.forEach((toast) => {
        if (toast.position === position) {
          const timer = timersRef.current.get(toast.id);
          if (timer) {
            clearTimeout(timer);
            timersRef.current.delete(toast.id);
          }
        }
      });

      return prev.filter((toast) => toast.position !== position);
    });
  }, []);

  const success = useCallback(
    (message: string | string[], options: Omit<ShowToastOptions, 'tone'> = {}) => {
      return show(message, { ...options, tone: 'success' });
    },
    [show],
  );

  const info = useCallback(
    (message: string | string[], options: Omit<ShowToastOptions, 'tone'> = {}) => {
      return show(message, { ...options, tone: 'info' });
    },
    [show],
  );

  const warning = useCallback(
    (message: string | string[], options: Omit<ShowToastOptions, 'tone'> = {}) => {
      return show(message, { ...options, tone: 'warning' });
    },
    [show],
  );

  const danger = useCallback(
    (message: string | string[], options: Omit<ShowToastOptions, 'tone'> = {}) => {
      return show(message, { ...options, tone: 'danger' });
    },
    [show],
  );

  const contextValue = useMemo(
    () => ({
      toasts,
      show,
      success,
      info,
      warning,
      danger,
      remove,
      clear,
    }),
    [clear, danger, info, remove, show, success, toasts, warning],
  );

  return (
    <ToasterContext.Provider value={contextValue}>
      {children}
      <Toaster toasts={toasts} onDismiss={remove} />
    </ToasterContext.Provider>
  );
}
