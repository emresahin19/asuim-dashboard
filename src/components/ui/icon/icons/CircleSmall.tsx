import * as React from "react";
import type { SVGProps } from "react";
const SvgCircleSmall = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><circle cx={12} cy={12} r={6} /></svg>;
export default SvgCircleSmall;