import * as React from "react";
import type { SVGProps } from "react";
const SvgAlbum = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} ry={2} /><path d="M11 3v8l3-3 3 3V3" /></svg>;
export default SvgAlbum;