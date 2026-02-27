import { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxColor = 'primary' | 'success' | 'danger' | 'neutral' | 'info' | 'warning';
export type CheckboxVariant = 'default' | 'card' | 'ghost'; // Card: Çerçeveli seçim kutusu

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode; // String yerine ReactNode yaptık (Bold text vs. için)
  description?: string; // Alt açıklama metni
  error?: boolean | string;
  size?: CheckboxSize;
  color?: CheckboxColor;
  variant?: CheckboxVariant;
  align?: 'start' | 'center'; // Hizalama
  reverse?: boolean; // Checkbox sağda, yazı solda olsun mu?
  icon?: ReactNode; // Custom icon desteği
}