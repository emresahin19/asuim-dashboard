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
      is2xl: false,
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
  const xl = width < breakpoints["2XL"] && !(lg || md || sm || xs);
  const the2xl = width >= breakpoints["2XL"];

  if (xs) name = "xs";
  if (sm) name = "sm";
  if (md) name = "md";
  if (lg) name = "lg";
  if (xl) name = "xl";
  if (the2xl) name = "2xl";

  return {
    name,

    isXs: xs,
    isSm: sm,
    isMd: md,
    isLg: lg,
    isXl: xl,
    is2xl: the2xl,

    smAndDown: xs || sm,
    smAndUp: sm || md || lg || xl || the2xl,
    mdAndDown: xs || sm || md,
    mdAndUp: md || lg || xl || the2xl,
    lgAndDown: xs || sm || md || lg,
    lgAndUp: lg || xl || the2xl,
    xlAndDown: xs || sm || md || lg || xl,
    xlAndUp: xl || the2xl,

    ...breakpoints,
  };
}
