import * as React from "react";
import type { SVGProps } from "react";
const SvgSquarePi = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} /><path d="M7 7h10M10 7v10M16 17a2 2 0 0 1-2-2V7" /></svg>;
export default SvgSquarePi;