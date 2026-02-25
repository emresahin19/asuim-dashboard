import { InputHTMLAttributes, TextareaHTMLAttributes, ChangeEvent } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'ghost' | 'error';

interface BaseInputProps {
    label?: string;
    error?: string | boolean;
    unit?: string;
    size?: InputSize;
    variant?: InputVariant;
    isClearable?: boolean;
    fullWidth?: boolean;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseInputProps {
    type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'textarea'; // Range'i ayırdık, o ayrı bir atom olmalı.
    rows?: number;
}