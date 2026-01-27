import * as React from "react";
import type { SVGProps } from "react";
const SvgCircleGauge = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" /><circle cx={12} cy={12} r={2} /><path d="M13.4 10.6 19 5" /></svg>;
export default SvgCircleGauge;