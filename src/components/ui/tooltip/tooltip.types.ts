import { CSSProperties, ReactNode } from 'react';

export type TooltipVariant = 'dark' | 'light' | 'soft';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

export type TooltipAlign = 'center' | 'start' | 'end';

export type TooltipTrigger = 'hover' | 'click' | 'manual';

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: TooltipVariant;
  position?: TooltipPosition;
  align?: TooltipAlign;
  trigger?: TooltipTrigger;
  delay?: number;
  withArrow?: boolean;
  disabled?: boolean;
  keepMounted?: boolean;
  maxWidth?: number | string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  tooltipStyle?: CSSProperties;
}
