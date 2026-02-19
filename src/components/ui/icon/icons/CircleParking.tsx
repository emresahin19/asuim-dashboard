import * as React from "react";
import type { SVGProps } from "react";
const SvgCircleParking = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><circle cx={12} cy={12} r={10} /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></svg>;
export default SvgCircleParking;