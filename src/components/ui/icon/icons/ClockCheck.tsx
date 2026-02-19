import * as React from "react";
import type { SVGProps } from "react";
const SvgClockCheck = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M12 6v6l4 2" /><path d="M22 12a10 10 0 1 0-11 9.95" /><path d="m22 16-5.5 5.5L14 19" /></svg>;
export default SvgClockCheck;