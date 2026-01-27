import * as React from "react";
import type { SVGProps } from "react";
const SvgCombine = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1M7 15l3 3M7 21l3-3H5a2 2 0 0 1-2-2v-2" /><rect width={7} height={7} x={14} y={14} rx={1} /><rect width={7} height={7} x={3} y={3} rx={1} /></svg>;
export default SvgCombine;