import * as React from "react";
import type { SVGProps } from "react";
const SvgOption = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M3 3h6l6 18h6M14 3h7" /></svg>;
export default SvgOption;