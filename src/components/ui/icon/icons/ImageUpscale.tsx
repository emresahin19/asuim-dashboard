import * as React from "react";
import type { SVGProps } from "react";
const SvgImageUpscale = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M16 3h5v5M17 21h2a2 2 0 0 0 2-2M21 12v3M21 3l-5 5M3 7V5a2 2 0 0 1 2-2M5 21l4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19M9 3h3" /><rect width={10} height={10} x={3} y={11} rx={1} /></svg>;
export default SvgImageUpscale;