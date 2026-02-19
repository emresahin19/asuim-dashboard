import * as React from "react";
import type { SVGProps } from "react";
const SvgBubbles = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M7.001 15.085A1.5 1.5 0 0 1 9 16.5" /><circle cx={18.5} cy={8.5} r={3.5} /><circle cx={7.5} cy={16.5} r={5.5} /><circle cx={7.5} cy={4.5} r={2.5} /></svg>;
export default SvgBubbles;