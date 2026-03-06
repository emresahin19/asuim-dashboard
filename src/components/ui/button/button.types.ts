import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'soft' | 'ghost' | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonColor = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'neutral';

interface CommonButtonProps {
  children?: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  fullWidth?: boolean;
  iconOnly?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  loadingText?: string;
}

export interface ButtonAsButtonProps
  extends CommonButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  href?: undefined;
}

export interface ButtonAsLinkProps
  extends CommonButtonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  href: string;
  external?: boolean;
  prefetch?: boolean;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;
