import * as React from "react";
import type { SVGProps } from "react";
const SvgCaptions = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={18} height={14} x={3} y={5} rx={2} ry={2} /><path d="M7 15h4m4 0h2M7 11h2m4 0h4" /></svg>;
export default SvgCaptions;