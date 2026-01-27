import * as React from "react";
import type { SVGProps } from "react";
const SvgSpline = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><circle cx={19} cy={5} r={2} /><circle cx={5} cy={19} r={2} /><path d="M5 17A12 12 0 0 1 17 5" /></svg>;
export default SvgSpline;