import * as React from "react";
import type { SVGProps } from "react";
const SvgMicrowave = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={20} height={15} x={2} y={4} rx={2} /><rect width={8} height={7} x={6} y={8} rx={1} /><path d="M18 8v7M6 19v2M18 19v2" /></svg>;
export default SvgMicrowave;