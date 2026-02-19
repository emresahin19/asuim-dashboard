import * as React from "react";
import type { SVGProps } from "react";
const SvgRollerCoaster = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M6 19V5M10 19V6.8M14 19v-7.8M18 5v4M18 19v-6M22 19V9M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65" /></svg>;
export default SvgRollerCoaster;