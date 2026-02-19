import * as React from "react";
import type { SVGProps } from "react";
const SvgCigarette = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14M18 8c0-2.5-2-2.5-2-5M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1M22 8c0-2.5-2-2.5-2-5M7 12v4" /></svg>;
export default SvgCigarette;