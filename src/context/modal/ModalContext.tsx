"use client";

import { createContext } from 'react';
import { ModalContextValue } from './modal.types';

export const ModalContext = createContext<ModalContextValue | null>(null);
