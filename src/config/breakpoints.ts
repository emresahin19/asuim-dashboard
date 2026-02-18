export const breakpoints = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

export type Breakpoint = keyof typeof breakpoints;
