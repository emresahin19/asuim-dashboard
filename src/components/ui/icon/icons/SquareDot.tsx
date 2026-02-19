import * as React from "react";
import type { SVGProps } from "react";
const SvgSquareDot = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} /><circle cx={12} cy={12} r={1} /></svg>;
export default SvgSquareDot;