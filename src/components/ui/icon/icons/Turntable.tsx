import * as React from "react";
import type { SVGProps } from "react";
const SvgTurntable = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M10 12.01h.01M18 8v4a8 8 0 0 1-1.07 4" /><circle cx={10} cy={12} r={4} /><rect width={20} height={16} x={2} y={4} rx={2} /></svg>;
export default SvgTurntable;