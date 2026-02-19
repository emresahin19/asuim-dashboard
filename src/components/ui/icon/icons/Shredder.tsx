import * as React from "react";
import type { SVGProps } from "react";
const SvgShredder = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5" /><path d="M14 2v5a1 1 0 0 0 1 1h5M10 22v-5M14 19v-2M18 20v-3M2 13h20M6 20v-3" /></svg>;
export default SvgShredder;