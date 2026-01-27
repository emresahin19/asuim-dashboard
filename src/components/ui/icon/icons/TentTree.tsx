import * as React from "react";
import type { SVGProps } from "react";
const SvgTentTree = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><circle cx={4} cy={4} r={2} /><path d="m14 5 3-3 3 3M14 10l3-3 3 3M17 14V2M17 14H7l-5 8h20ZM8 14v8M9 14l5 8" /></svg>;
export default SvgTentTree;