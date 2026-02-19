import * as React from "react";
import type { SVGProps } from "react";
const SvgAxis3D = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M13.5 10.5 15 9M4 4v15a1 1 0 0 0 1 1h15M4.293 19.707 6 18M9 15l1.5-1.5" /></svg>;
export default SvgAxis3D;