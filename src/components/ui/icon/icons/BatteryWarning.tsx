import * as React from "react";
import type { SVGProps } from "react";
const SvgBatteryWarning = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M10 17h.01M10 7v6M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2M22 14v-4M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" /></svg>;
export default SvgBatteryWarning;