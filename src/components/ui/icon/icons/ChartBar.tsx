import * as React from "react";
import type { SVGProps } from "react";
const SvgChartBar = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M3 3v16a2 2 0 0 0 2 2h16M7 16h8M7 11h12M7 6h3" /></svg>;
export default SvgChartBar;