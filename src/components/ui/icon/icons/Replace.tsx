import * as React from "react";
import type { SVGProps } from "react";
const SvgReplace = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M14 4a1 1 0 0 1 1-1M15 10a1 1 0 0 1-1-1M21 4a1 1 0 0 0-1-1M21 9a1 1 0 0 1-1 1M3 7l3 3 3-3" /><path d="M6 10V5a2 2 0 0 1 2-2h2" /><rect width={7} height={7} x={3} y={14} rx={1} /></svg>;
export default SvgReplace;