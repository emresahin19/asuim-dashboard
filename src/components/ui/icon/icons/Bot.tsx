import * as React from "react";
import type { SVGProps } from "react";
const SvgBot = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M12 8V4H8" /><rect width={16} height={12} x={4} y={8} rx={2} /><path d="M2 14h2M20 14h2M15 13v2M9 13v2" /></svg>;
export default SvgBot;