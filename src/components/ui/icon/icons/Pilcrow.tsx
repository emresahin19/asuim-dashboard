import * as React from "react";
import type { SVGProps } from "react";
const SvgPilcrow = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M13 4v16M17 4v16M19 4H9.5a4.5 4.5 0 0 0 0 9H13" /></svg>;
export default SvgPilcrow;