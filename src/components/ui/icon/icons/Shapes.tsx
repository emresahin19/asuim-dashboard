import * as React from "react";
import type { SVGProps } from "react";
const SvgShapes = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" /><rect width={7} height={7} x={3} y={14} rx={1} /><circle cx={17.5} cy={17.5} r={3.5} /></svg>;
export default SvgShapes;