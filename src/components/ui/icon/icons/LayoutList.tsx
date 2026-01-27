import * as React from "react";
import type { SVGProps } from "react";
const SvgLayoutList = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={7} height={7} x={3} y={3} rx={1} /><rect width={7} height={7} x={3} y={14} rx={1} /><path d="M14 4h7M14 9h7M14 15h7M14 20h7" /></svg>;
export default SvgLayoutList;