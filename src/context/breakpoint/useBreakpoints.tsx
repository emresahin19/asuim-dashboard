import { useContext } from "react";
import { BreakpointsContext } from "./BreakpointContext";

export const useBreakpoints = () => {
  const context = useContext(BreakpointsContext);

  if (!context) {
    throw new Error("useBreakpointsContext must be used within a BreakpointProvider");
  }

  return context;
};
