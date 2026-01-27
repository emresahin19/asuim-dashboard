import * as React from "react";
import type { SVGProps } from "react";
const SvgPictureInPicture = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M2 10h6V4M2 4l6 6M21 10V7a2 2 0 0 0-2-2h-7M3 14v2a2 2 0 0 0 2 2h3" /><rect width={10} height={7} x={12} y={14} rx={1} /></svg>;
export default SvgPictureInPicture;