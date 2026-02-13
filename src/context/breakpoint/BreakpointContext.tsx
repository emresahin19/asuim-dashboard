'use client';

import { createContext } from "react";
import { BreakpointsContextType } from "@/types";

export const BreakpointsContext = createContext<BreakpointsContextType | null>(null);
