import * as React from "react";
import type { SVGProps } from "react";
const SvgNetwork = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={6} height={6} x={16} y={16} rx={1} /><rect width={6} height={6} x={2} y={16} rx={1} /><rect width={6} height={6} x={9} y={2} rx={1} /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8" /></svg>;
export default SvgNetwork;