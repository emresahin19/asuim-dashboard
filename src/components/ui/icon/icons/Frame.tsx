import * as React from "react";
import type { SVGProps } from "react";
const SvgFrame = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M22 6H2M22 18H2M6 2v20M18 2v20" /></svg>;
export default SvgFrame;