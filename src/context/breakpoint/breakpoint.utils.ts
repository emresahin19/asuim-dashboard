import { breakpoints } from "@/config";
import { isServer } from "@/utils";

export function getBreakpoint(forceServer = false) {
  if (isServer || forceServer) {
    return {
      name: "",
      isXs: false,
      isSm: false,
      isMd: false,
      isLg: false,
      isXl: false,
      smAndDown: false,
      smAndUp: false,
      mdAndDown: false,
      mdAndUp: false,
      lgAndDown: false,
      lgAndUp: false,
      xlAndDown: false,
      xlAndUp: false,
      ...breakpoints,
    };
  }

  const width = window.innerWidth;

  let name = "";

  const xs = width < breakpoints.SM;
  const sm = width < breakpoints.MD && !xs;
  const md = width < breakpoints.LG && !(sm || xs);
  const lg = width < breakpoints.XL && !(md || sm || xs);
  const xl = width >= breakpoints.XL && !(lg || md || sm || xs);

  if (xs) name = "xs";
  if (sm) name = "sm";
  if (md) name = "md";
  if (lg) name = "lg";
  if (xl) name = "xl";

  return {
    name,

    isXs: xs,
    isSm: sm,
    isMd: md,
    isLg: lg,
    isXl: xl,

    smAndDown: xs || sm,
    smAndUp: sm || md || lg || xl,
    mdAndDown: xs || sm || md,
    mdAndUp: md || lg || xl,
    lgAndDown: xs || sm || md || lg,
    lgAndUp: lg || xl,
    xlAndDown: xs || sm || md || lg || xl,
    xlAndUp: xl,

    ...breakpoints,
  };
}
