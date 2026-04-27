import { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxColor = 'primary' | 'success' | 'danger' | 'neutral' | 'info' | 'warning';
export type CheckboxVariant = 'default' | 'card' | 'ghost'; // Card: bordered selection box

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode; // ReactNode instead of string (for bold text etc.)
  description?: string; // Secondary description text
  error?: boolean | string;
  size?: CheckboxSize;
  color?: CheckboxColor;
  variant?: CheckboxVariant;
  align?: 'start' | 'center'; // Alignment
  reverse?: boolean; // Checkbox on the right, label on the left?
  icon?: ReactNode; // Custom icon support
}