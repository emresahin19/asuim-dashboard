import * as React from "react";
import type { SVGProps } from "react";
const SvgHd = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M10 12H6M10 15V9M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5zM6 15V9" /><rect width={20} height={14} x={2} y={5} rx={2} /></svg>;
export default SvgHd;