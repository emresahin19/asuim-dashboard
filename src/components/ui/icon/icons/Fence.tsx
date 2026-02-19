import * as React from "react";
import type { SVGProps } from "react";
const SvgFence = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5ZM6 8h4M6 18h4M12 3l-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5ZM14 8h4M14 18h4M20 3l-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" /></svg>;
export default SvgFence;