import * as React from "react";
import type { SVGProps } from "react";
const SvgSquareCode = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="m10 9-3 3 3 3M14 15l3-3-3-3" /><rect width={18} height={18} x={3} y={3} rx={2} /></svg>;
export default SvgSquareCode;