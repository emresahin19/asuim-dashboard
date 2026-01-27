import * as React from "react";
import type { SVGProps } from "react";
const SvgSendToBack = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={8} height={8} x={14} y={14} rx={2} /><rect width={8} height={8} x={2} y={2} rx={2} /><path d="M7 14v1a2 2 0 0 0 2 2h1M14 7h1a2 2 0 0 1 2 2v1" /></svg>;
export default SvgSendToBack;