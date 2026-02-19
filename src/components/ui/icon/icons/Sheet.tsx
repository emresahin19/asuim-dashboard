import * as React from "react";
import type { SVGProps } from "react";
const SvgSheet = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} ry={2} /><path d="M3 9h18M3 15h18M9 9v12M15 9v12" /></svg>;
export default SvgSheet;