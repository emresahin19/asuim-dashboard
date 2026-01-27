import * as React from "react";
import type { SVGProps } from "react";
const SvgNotebookText = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M2 6h4M2 10h4M2 14h4M2 18h4" /><rect width={16} height={20} x={4} y={2} rx={2} /><path d="M9.5 8h5M9.5 12H16M9.5 16H14" /></svg>;
export default SvgNotebookText;