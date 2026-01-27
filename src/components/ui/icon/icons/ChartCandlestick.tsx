import * as React from "react";
import type { SVGProps } from "react";
const SvgChartCandlestick = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M9 5v4" /><rect width={4} height={6} x={7} y={9} rx={1} /><path d="M9 15v2M17 3v2" /><rect width={4} height={8} x={15} y={5} rx={1} /><path d="M17 13v3M3 3v16a2 2 0 0 0 2 2h16" /></svg>;
export default SvgChartCandlestick;