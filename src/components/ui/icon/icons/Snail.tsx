import * as React from "react";
import type { SVGProps } from "react";
const SvgSnail = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0" /><circle cx={10} cy={13} r={8} /><path d="M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6M18 3l1.1 2.2M22 3l-1.1 2.2" /></svg>;
export default SvgSnail;