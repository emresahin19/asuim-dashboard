import * as React from "react";
import type { SVGProps } from "react";
const SvgScissors = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><circle cx={6} cy={6} r={3} /><path d="M8.12 8.12 12 12M20 4 8.12 15.88" /><circle cx={6} cy={18} r={3} /><path d="M14.8 14.8 20 20" /></svg>;
export default SvgScissors;