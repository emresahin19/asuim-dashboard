import * as React from "react";
import type { SVGProps } from "react";
const SvgGrid2X2 = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M12 3v18M3 12h18" /><rect width={18} height={18} x={3} y={3} rx={2} /></svg>;
export default SvgGrid2X2;