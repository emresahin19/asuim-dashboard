import * as React from "react";
import type { SVGProps } from "react";
const SvgAnchor = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M12 6v16M19 13l2-1a9 9 0 0 1-18 0l2 1M9 11h6" /><circle cx={12} cy={4} r={2} /></svg>;
export default SvgAnchor;