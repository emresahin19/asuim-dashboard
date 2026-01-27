import * as React from "react";
import type { SVGProps } from "react";
const SvgRadius = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M20.34 17.52a10 10 0 1 0-2.82 2.82" /><circle cx={19} cy={19} r={2} /><path d="m13.41 13.41 4.18 4.18" /><circle cx={12} cy={12} r={2} /></svg>;
export default SvgRadius;