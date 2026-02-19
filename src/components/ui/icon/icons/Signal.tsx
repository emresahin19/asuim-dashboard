import * as React from "react";
import type { SVGProps } from "react";
const SvgSignal = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16" /></svg>;
export default SvgSignal;