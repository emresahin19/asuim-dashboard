import * as React from "react";
import type { SVGProps } from "react";
const SvgRulerDimensionLine = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M10 15v-3M14 15v-3M18 15v-3M2 8V4M22 6H2M22 8V4M6 15v-3" /><rect width={20} height={8} x={2} y={12} rx={2} /></svg>;
export default SvgRulerDimensionLine;