import * as React from "react";
import type { SVGProps } from "react";
const SvgCurrency = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><circle cx={12} cy={12} r={8} /><path d="m3 3 3 3M21 3l-3 3M3 21l3-3M21 21l-3-3" /></svg>;
export default SvgCurrency;