import { CSSProperties, InputHTMLAttributes } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'ghost' | 'error' | 'floating';

interface BaseInputProps {
    label?: string;
    error?: string | boolean;
    unit?: string;
    size?: InputSize;
    variant?: InputVariant;
    isClearable?: boolean;
    isCopyable?: boolean;
    fullWidth?: boolean;
    containerStyle?: CSSProperties;
    cssVars?: Partial<Record<`--${string}`, string | number>>;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseInputProps {
    type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'textarea' | 'file'; // Range is separated, it should be its own atom.
    rows?: number;
    dropText?: string;
    helperText?: string;
}