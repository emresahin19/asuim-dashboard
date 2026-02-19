import * as React from "react";
import type { SVGProps } from "react";
const SvgCastle = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M10 5V3M14 5V3M15 21v-3a3 3 0 0 0-6 0v3M18 3v8M18 5H6M22 11H2" /><path d="M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9M6 3v8" /></svg>;
export default SvgCastle;