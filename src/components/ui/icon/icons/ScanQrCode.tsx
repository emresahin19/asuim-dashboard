import * as React from "react";
import type { SVGProps } from "react";
const SvgScanQrCode = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M17 12v4a1 1 0 0 1-1 1h-4M17 3h2a2 2 0 0 1 2 2v2M17 8V7M21 17v2a2 2 0 0 1-2 2h-2M3 7V5a2 2 0 0 1 2-2h2M7 17h.01M7 21H5a2 2 0 0 1-2-2v-2" /><rect width={5} height={5} x={7} y={7} rx={1} /></svg>;
export default SvgScanQrCode;