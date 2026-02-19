import * as React from "react";
import type { SVGProps } from "react";
const SvgKanban = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M5 3v14M12 3v8M19 3v18" /></svg>;
export default SvgKanban;