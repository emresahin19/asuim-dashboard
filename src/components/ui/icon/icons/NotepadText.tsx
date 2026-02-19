import * as React from "react";
import type { SVGProps } from "react";
const SvgNotepadText = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M8 2v4M12 2v4M16 2v4" /><rect width={16} height={18} x={4} y={4} rx={2} /><path d="M8 10h6M8 14h8M8 18h5" /></svg>;
export default SvgNotepadText;