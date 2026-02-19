import * as React from "react";
import type { SVGProps } from "react";
const SvgForm = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M4 14h6M4 2h10" /><rect width={16} height={4} x={4} y={18} rx={1} /><rect width={16} height={4} x={4} y={6} rx={1} /></svg>;
export default SvgForm;