import * as React from "react";
import type { SVGProps } from "react";
const SvgSquareMenu = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} /><path d="M7 8h10M7 12h10M7 16h10" /></svg>;
export default SvgSquareMenu;