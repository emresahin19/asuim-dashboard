import * as React from "react";
import type { SVGProps } from "react";
const SvgWaypoints = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="m10.586 5.414-5.172 5.172M18.586 13.414l-5.172 5.172M6 12h12" /><circle cx={12} cy={20} r={2} /><circle cx={12} cy={4} r={2} /><circle cx={20} cy={12} r={2} /><circle cx={4} cy={12} r={2} /></svg>;
export default SvgWaypoints;