import * as React from "react";
import type { SVGProps } from "react";
const SvgCrosshair = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><circle cx={12} cy={12} r={10} /><path d="M22 12h-4M6 12H2M12 6V2M12 22v-4" /></svg>;
export default SvgCrosshair;