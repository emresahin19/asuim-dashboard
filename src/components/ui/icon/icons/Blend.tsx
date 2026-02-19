import * as React from "react";
import type { SVGProps } from "react";
const SvgBlend = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><circle cx={9} cy={9} r={7} /><circle cx={15} cy={15} r={7} /></svg>;
export default SvgBlend;