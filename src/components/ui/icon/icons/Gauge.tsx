import * as React from "react";
import type { SVGProps } from "react";
const SvgGauge = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="m12 14 4-4M3.34 19a10 10 0 1 1 17.32 0" /></svg>;
export default SvgGauge;