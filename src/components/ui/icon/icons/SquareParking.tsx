import * as React from "react";
import type { SVGProps } from "react";
const SvgSquareParking = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></svg>;
export default SvgSquareParking;