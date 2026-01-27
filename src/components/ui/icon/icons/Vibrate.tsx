import * as React from "react";
import type { SVGProps } from "react";
const SvgVibrate = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="m2 8 2 2-2 2 2 2-2 2M22 8l-2 2 2 2-2 2 2 2" /><rect width={8} height={14} x={8} y={5} rx={1} /></svg>;
export default SvgVibrate;