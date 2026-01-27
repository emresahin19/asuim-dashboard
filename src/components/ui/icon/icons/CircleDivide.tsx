import * as React from "react";
import type { SVGProps } from "react";
const SvgCircleDivide = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M8 12h8M12 8" /><circle cx={12} cy={12} r={10} /></svg>;
export default SvgCircleDivide;