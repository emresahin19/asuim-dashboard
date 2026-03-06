"use client";

import { createContext } from 'react';
import { ToasterContextValue } from './toaster.types';

export const ToasterContext = createContext<ToasterContextValue | null>(null);
