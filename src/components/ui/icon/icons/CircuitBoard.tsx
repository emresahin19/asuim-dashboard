import * as React from "react";
import type { SVGProps } from "react";
const SvgCircuitBoard = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} /><path d="M11 9h4a2 2 0 0 0 2-2V3" /><circle cx={9} cy={9} r={2} /><path d="M7 21v-4a2 2 0 0 1 2-2h4" /><circle cx={15} cy={15} r={2} /></svg>;
export default SvgCircuitBoard;