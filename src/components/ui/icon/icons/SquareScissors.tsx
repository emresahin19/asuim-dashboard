import * as React from "react";
import type { SVGProps } from "react";
const SvgSquareScissors = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} /><circle cx={8.5} cy={8.5} r={1.5} /><path d="M9.561 9.561 12 12M17 17l-2.18-2.18" /><circle cx={8.5} cy={15.5} r={1.5} /><path d="M9.561 14.439 17 7" /></svg>;
export default SvgSquareScissors;