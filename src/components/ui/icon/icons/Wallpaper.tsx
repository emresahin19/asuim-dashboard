import * as React from "react";
import type { SVGProps } from "react";
const SvgWallpaper = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M12 17v4M8 21h8M9 17l6.1-6.1a2 2 0 0 1 2.81.01L22 15" /><circle cx={8} cy={9} r={2} /><rect width={20} height={14} x={2} y={3} rx={2} /></svg>;
export default SvgWallpaper;