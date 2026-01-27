import * as React from "react";
import type { SVGProps } from "react";
const SvgEclipse = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><circle cx={12} cy={12} r={10} /><path d="M12 2a7 7 0 1 0 10 10" /></svg>;
export default SvgEclipse;