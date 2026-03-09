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
  items: DropdownItem[];
  triggerLabel: string;
  label?: string;
  size?: DropdownSize;
  align?: DropdownAlign;
  className?: string;
  disabled?: boolean;
  closeOnSelect?: boolean;
  selectedItemId?: string | number;
  onSelect?: (item: DropdownItem) => void;
}
