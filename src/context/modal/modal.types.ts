import { ReactNode } from 'react';

export type ModalVariant = 'default' | 'elevated' | 'glass';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ModalPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

export interface ShowModalOptions {
  title?: string;
  description?: string;
  content: ReactNode;
  variant?: ModalVariant;
  size?: ModalSize;
  position?: ModalPosition;
  withBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  dismissible?: boolean;
  lockScroll?: boolean;
}

export interface ModalItem {
  id: string;
  title?: string;
  description?: string;
  content: ReactNode;
  variant: ModalVariant;
  size: ModalSize;
  position: ModalPosition;
  withBackdrop: boolean;
  closeOnBackdropClick: boolean;
  closeOnEscape: boolean;
  dismissible: boolean;
  lockScroll: boolean;
  createdAt: number;
}

export interface ModalProviderProps {
  children: ReactNode;
}

export interface ModalContextValue {
  modals: ModalItem[];
  open: (options: ShowModalOptions) => string;
  close: (id: string) => void;
  closeTop: () => void;
  clear: () => void;
  update: (id: string, updates: Partial<Omit<ModalItem, 'id' | 'createdAt'>>) => void;
}

export interface ModalHostProps {
  modals: ModalItem[];
  onClose: (id: string) => void;
}
