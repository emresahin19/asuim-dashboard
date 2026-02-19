import * as React from "react";
import type { SVGProps } from "react";
const SvgScooter = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M21 4h-3.5l2 11.05M6.95 17h5.142c.523 0 .95-.406 1.063-.916a6.5 6.5 0 0 1 5.345-5.009" /><circle cx={19.5} cy={17.5} r={2.5} /><circle cx={4.5} cy={17.5} r={2.5} /></svg>;
export default SvgScooter;