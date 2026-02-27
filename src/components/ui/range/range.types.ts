import { InputHTMLAttributes, ReactNode } from 'react';
import { StaticImageData } from 'next/image';

export type RangeSize = 'sm' | 'md' | 'lg';
export type RangeColor = 'primary' | 'success' | 'danger' | 'neutral' | 'warning' | 'info';

export interface RangeProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  showValue?: boolean;
  formatValue?: (val: number) => string;
  minLabel?: string;
  maxLabel?: string;
  thumbImage?: string | StaticImageData;
  thumbSize?: number;
  
  error?: boolean | string;
  size?: RangeSize;
  color?: RangeColor;
}