import { DateRange } from 'react-day-picker';
import { InputSize } from '../input/input.types';

export type DatePickerMode = 'single' | 'range';

export interface DatePickerProps {
  mode?: DatePickerMode;
  value?: Date | DateRange;
  onChange?: (date: Date | DateRange | undefined) => void;
  
  label?: string;
  ariaLabel?: string;
  placeholder?: string;
  error?: boolean | string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  
  // UI
  className?: string;
  size?: InputSize;
  fullWidth?: boolean;
  showPresets?: boolean; // "Son 7 gün" gibi butonlar
  startYear?: number;
  endYear?: number;
}