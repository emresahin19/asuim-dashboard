import * as React from "react";
import type { SVGProps } from "react";
const SvgSquareX = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} ry={2} /><path d="m15 9-6 6M9 9l6 6" /></svg>;
export default SvgSquareX;