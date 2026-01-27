import * as React from "react";
import type { SVGProps } from "react";
const SvgSquareUser = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} /><circle cx={12} cy={10} r={3} /><path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" /></svg>;
export default SvgSquareUser;