import * as React from "react";
import type { SVGProps } from "react";
const SvgInspectionPanel = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} /><path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01" /></svg>;
export default SvgInspectionPanel;