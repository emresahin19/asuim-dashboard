import * as React from "react";
import type { SVGProps } from "react";
const SvgAppWindow = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><rect width={20} height={16} x={2} y={4} rx={2} /><path d="M10 4v4M2 8h20M6 4v4" /></svg>;
export default SvgAppWindow;