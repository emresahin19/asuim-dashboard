import * as React from "react";
import type { SVGProps } from "react";
const SvgGalleryThumbnails = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><rect width={18} height={14} x={3} y={3} rx={2} /><path d="M4 21h1M9 21h1M14 21h1M19 21h1" /></svg>;
export default SvgGalleryThumbnails;