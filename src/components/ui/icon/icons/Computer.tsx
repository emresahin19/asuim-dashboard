import * as React from "react";
import type { SVGProps } from "react";
const SvgComputer = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><rect width={14} height={8} x={5} y={2} rx={2} /><rect width={20} height={8} x={2} y={14} rx={2} /><path d="M6 18h2M12 18h6" /></svg>;
export default SvgComputer;