import * as React from "react";
import type { SVGProps } from "react";
const SvgMars = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M16 3h5v5M21 3l-6.75 6.75" /><circle cx={10} cy={14} r={6} /></svg>;
export default SvgMars;