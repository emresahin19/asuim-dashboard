import * as React from "react";
import type { SVGProps } from "react";
const SvgRectangleCircle = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" /><circle cx={14} cy={12} r={8} /></svg>;
export default SvgRectangleCircle;