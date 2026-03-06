import { ReactNode } from 'react';

export type ToastVariant = 'soft' | 'solid' | 'outline';

export type ToastTone = 'default' | 'info' | 'success' | 'warning' | 'danger';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ShowToastOptions {
  title?: string;
  duration?: number;
  variant?: ToastVariant;
  tone?: ToastTone;
  position?: ToastPosition;
  dismissible?: boolean;
}

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  duration: number;
  variant: ToastVariant;
  tone: ToastTone;
  position: ToastPosition;
  dismissible: boolean;
  createdAt: number;
}

export interface ToasterProviderProps {
  children: ReactNode;
}

export interface ToasterContextValue {
  toasts: ToastItem[];
  show: (message: string | string[], options?: ShowToastOptions) => string[];
  success: (message: string | string[], options?: Omit<ShowToastOptions, 'tone'>) => string[];
  info: (message: string | string[], options?: Omit<ShowToastOptions, 'tone'>) => string[];
  warning: (message: string | string[], options?: Omit<ShowToastOptions, 'tone'>) => string[];
  danger: (message: string | string[], options?: Omit<ShowToastOptions, 'tone'>) => string[];
  remove: (id: string) => void;
  clear: (position?: ToastPosition) => void;
}

export interface ToasterViewportProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}
