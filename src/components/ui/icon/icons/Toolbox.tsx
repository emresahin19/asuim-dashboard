import * as React from "react";
import type { SVGProps } from "react";
const SvgToolbox = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M16 12v4M16 6a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 .586-1.414l4-4A2 2 0 0 1 8 6zM16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 14h20M8 12v4" /></svg>;
export default SvgToolbox;