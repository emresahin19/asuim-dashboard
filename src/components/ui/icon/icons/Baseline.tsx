import * as React from "react";
import type { SVGProps } from "react";
const SvgBaseline = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M4 20h16M6 16l6-12 6 12M8 12h8" /></svg>;
export default SvgBaseline;