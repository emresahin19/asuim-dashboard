import * as React from "react";
import type { SVGProps } from "react";
const SvgCalendarX = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M8 2v4M16 2v4" /><rect width={18} height={18} x={3} y={4} rx={2} /><path d="M3 10h18M14 14l-4 4M10 14l4 4" /></svg>;
export default SvgCalendarX;