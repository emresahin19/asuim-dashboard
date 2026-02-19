import * as React from "react";
import type { SVGProps } from "react";
const SvgMails = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732M22 5.5l-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5" /><rect width={15} height={12} x={7} y={3} rx={2} /></svg>;
export default SvgMails;