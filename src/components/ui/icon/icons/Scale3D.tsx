import * as React from "react";
import type { SVGProps } from "react";
const SvgScale3D = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M5 7v11a1 1 0 0 0 1 1h11M5.293 18.707 11 13" /><circle cx={19} cy={19} r={2} /><circle cx={5} cy={5} r={2} /></svg>;
export default SvgScale3D;