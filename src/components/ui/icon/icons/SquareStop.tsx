import * as React from "react";
import type { SVGProps } from "react";
const SvgSquareStop = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} /><rect width={6} height={6} x={9} y={9} rx={1} /></svg>;
export default SvgSquareStop;