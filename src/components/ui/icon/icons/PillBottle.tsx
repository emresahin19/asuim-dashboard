import * as React from "react";
import type { SVGProps } from "react";
const SvgPillBottle = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4" /><path d="M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" /><rect width={16} height={5} x={4} y={2} rx={1} /></svg>;
export default SvgPillBottle;