import * as React from "react";
import type { SVGProps } from "react";
const SvgSquareActivity = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} /><path d="M17 12h-2l-2 5-2-10-2 5H7" /></svg>;
export default SvgSquareActivity;