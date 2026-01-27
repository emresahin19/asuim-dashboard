import * as React from "react";
import type { SVGProps } from "react";
const SvgCalendarRange = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={4} rx={2} /><path d="M16 2v4M3 10h18M8 2v4M17 14h-6M13 18H7M7 14h.01M17 18h.01" /></svg>;
export default SvgCalendarRange;