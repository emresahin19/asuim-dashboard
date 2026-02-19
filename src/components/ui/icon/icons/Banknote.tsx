import * as React from "react";
import type { SVGProps } from "react";
const SvgBanknote = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><rect width={20} height={12} x={2} y={6} rx={2} /><circle cx={12} cy={12} r={2} /><path d="M6 12h.01M18 12h.01" /></svg>;
export default SvgBanknote;