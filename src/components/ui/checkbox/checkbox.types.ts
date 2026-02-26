import { InputHTMLAttributes } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: boolean | string;
  size?: CheckboxSize;
  indeterminate?: boolean;
}