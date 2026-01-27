import * as React from "react";
import type { SVGProps } from "react";
const SvgBrickWall = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={18} height={18} x={3} y={3} rx={2} /><path d="M12 9v6M16 15v6M16 3v6M3 15h18M3 9h18M8 15v6M8 3v6" /></svg>;
export default SvgBrickWall;