import { InputHTMLAttributes, ReactNode } from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioColor = 'primary' | 'success' | 'danger' | 'neutral' | 'info' | 'warning';
export type RadioVariant = 'default' | 'card' | 'ghost';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  description?: string;
  error?: boolean | string;
  size?: RadioSize;
  color?: RadioColor;
  variant?: RadioVariant;
  align?: 'start' | 'center';
  reverse?: boolean;
  hideIndicator?: boolean;
}