import * as React from "react";
import type { SVGProps } from "react";
const SvgRainbow = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M22 17a10 10 0 0 0-20 0" /><path d="M6 17a6 6 0 0 1 12 0" /><path d="M10 17a2 2 0 0 1 4 0" /></svg>;
export default SvgRainbow;