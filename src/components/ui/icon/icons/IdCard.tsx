import * as React from "react";
import type { SVGProps } from "react";
const SvgIdCard = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M16 10h2M16 14h2M6.17 15a3 3 0 0 1 5.66 0" /><circle cx={9} cy={11} r={2} /><rect width={20} height={14} x={2} y={5} rx={2} /></svg>;
export default SvgIdCard;