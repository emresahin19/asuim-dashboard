import { InputHTMLAttributes, ReactNode } from 'react';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchColor = 'primary' | 'success' | 'danger' | 'neutral' | 'info' | 'warning';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  description?: string;
  error?: boolean | string;
  size?: SwitchSize;
  color?: SwitchColor;
  loading?: boolean; // Loading state (toggle is locked)
  reverse?: boolean; // Label on the left, switch on the right
}