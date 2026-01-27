import * as React from "react";
import type { SVGProps } from "react";
const SvgDot = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><circle cx={12.1} cy={12.1} r={1} /></svg>;
export default SvgDot;