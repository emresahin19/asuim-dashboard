import { CSSProperties, ReactNode } from 'react';

export type DrawerPosition = 'left' | 'right';

export interface DrawerProps extends React.HTMLAttributes<HTMLElement> {
  isOpen: boolean;
  onClose?: () => void;
  header?: ReactNode;
  position?: DrawerPosition;
  withBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  headerActions?: ReactNode;
  bodyClassName?: string;
  drawerStyle?: CSSProperties;
}
