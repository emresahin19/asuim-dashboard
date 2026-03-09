import { ReactNode } from 'react';

export type DropdownAlign = 'start' | 'end';
export type DropdownSize = 'sm' | 'md' | 'lg';

export interface DropdownItem {
  id: string | number;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
}

export interface DropdownProps {
  items?: DropdownItem[];
  triggerLabel: string;
  label?: string;
  size?: DropdownSize;
  align?: DropdownAlign;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  triggerVariant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'link';
  triggerColor?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'neutral';
  disabled?: boolean;
  closeOnSelect?: boolean;
  selectedItemId?: string | number;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  content?: ReactNode | ((helpers: { close: () => void; isOpen: boolean }) => ReactNode);
  menuRole?: 'menu' | 'dialog';
  onSelect?: (item: DropdownItem) => void;
}
