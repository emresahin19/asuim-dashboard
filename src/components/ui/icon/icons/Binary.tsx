import * as React from "react";
import type { SVGProps } from "react";
const SvgBinary = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={4} height={6} x={14} y={14} rx={2} /><rect width={4} height={6} x={6} y={4} rx={2} /><path d="M6 20h4M14 10h4M6 14h2v6M14 4h2v6" /></svg>;
export default SvgBinary;