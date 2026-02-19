import * as React from "react";
import type { SVGProps } from "react";
const SvgLectern = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3" /><path d="M18 6V3a1 1 0 0 0-1-1h-3" /><rect width={8} height={12} x={8} y={10} rx={1} /></svg>;
export default SvgLectern;