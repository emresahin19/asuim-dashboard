import * as React from "react";
import type { SVGProps } from "react";
const SvgGalleryHorizontal = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M2 3v18" /><rect width={12} height={18} x={6} y={3} rx={2} /><path d="M22 3v18" /></svg>;
export default SvgGalleryHorizontal;