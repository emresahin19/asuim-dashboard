import * as React from "react";
import type { SVGProps } from "react";
const SvgLasso = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M3.704 14.467a10 8 0 1 1 3.115 2.375M7 22a5 5 0 0 1-2-3.994" /><circle cx={5} cy={16} r={2} /></svg>;
export default SvgLasso;