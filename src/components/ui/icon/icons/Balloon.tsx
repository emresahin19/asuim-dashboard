import * as React from "react";
import type { SVGProps } from "react";
const SvgBalloon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1M12 6a2 2 0 0 1 2 2" /><path d="M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0" /></svg>;
export default SvgBalloon;