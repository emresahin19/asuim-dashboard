import * as React from "react";
import type { SVGProps } from "react";
const SvgBan = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M4.929 4.929 19.07 19.071" /><circle cx={12} cy={12} r={10} /></svg>;
export default SvgBan;