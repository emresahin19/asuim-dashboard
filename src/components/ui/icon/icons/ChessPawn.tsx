import * as React from "react";
import type { SVGProps } from "react";
const SvgChessPawn = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zM14.5 10l1.5 8M7 10h10M8 18l1.5-8" /><circle cx={12} cy={6} r={4} /></svg>;
export default SvgChessPawn;