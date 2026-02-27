// src/components/ui/select/select.types.ts
import { ReactNode } from 'react';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: any; // Ekstra data taşıyabilmek için
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export type SelectValue = SelectOption | SelectOption[] | null;
export type SelectVariant = 'default' | 'floating';

export interface SelectProps {
  // Data
  options: (SelectOption | SelectGroup)[];
  value?: SelectValue;
  onChange: (value: SelectValue) => void;

  // Configuration
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  
  // UI
  label?: string;
  placeholder?: string;
  error?: string | boolean;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: SelectVariant;
}