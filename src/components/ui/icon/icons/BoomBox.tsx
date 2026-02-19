import * as React from "react";
import type { SVGProps } from "react";
const SvgBoomBox = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M8 8v1M12 8v1M16 8v1" /><rect width={20} height={12} x={2} y={9} rx={2} /><circle cx={8} cy={15} r={2} /><circle cx={16} cy={15} r={2} /></svg>;
export default SvgBoomBox;