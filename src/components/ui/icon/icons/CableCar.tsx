import * as React from "react";
import type { SVGProps } from "react";
const SvgCableCar = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M10 3h.01M14 2h.01M2 9l20-5M12 12V6.5" /><rect width={16} height={10} x={4} y={12} rx={3} /><path d="M9 12v5M15 12v5M4 17h16" /></svg>;
export default SvgCableCar;