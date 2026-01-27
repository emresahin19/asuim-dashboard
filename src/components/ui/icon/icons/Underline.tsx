import * as React from "react";
import type { SVGProps } from "react";
const SvgUnderline = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M6 4v6a6 6 0 0 0 12 0V4M4 20h16" /></svg>;
export default SvgUnderline;