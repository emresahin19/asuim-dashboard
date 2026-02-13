'use client';
import { ReactNode, useEffect, useRef, useState } from "react";

import { isServer } from "@/utils/is-server";
import { BreakpointsContextType } from "@/types";
import { BreakpointsContext } from "./BreakpointContext";
import { getBreakpoint } from "./breakpoint.utils";

export function BreakpointProvider({ children }: { children: ReactNode }) {
  const [breakpointState, setBreakpointState] =
    useState<BreakpointsContextType>(() => getBreakpoint(true));

  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const updateBreakpoint = () => {
      const current = getBreakpoint();
      if (current.name !== breakpointState.name) {
        setBreakpointState(current);
      }
    };

    if (!isServer) {
      resizeObserverRef.current = new ResizeObserver(updateBreakpoint);
      resizeObserverRef.current.observe(document.documentElement);
    }

    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, [breakpointState.name]);

  if (!children) {
    return null;
  }

  return (
    <BreakpointsContext.Provider value={breakpointState}>{children}</BreakpointsContext.Provider>
  );
}

