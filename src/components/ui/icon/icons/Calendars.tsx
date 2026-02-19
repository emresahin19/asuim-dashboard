import * as React from "react";
import type { SVGProps } from "react";
const SvgCalendars = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M12 2v2M15.726 21.01A2 2 0 0 1 14 22H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2M18 2v2M2 13h2M8 8h14" /><rect width={14} height={14} x={8} y={3} rx={2} /></svg>;
export default SvgCalendars;