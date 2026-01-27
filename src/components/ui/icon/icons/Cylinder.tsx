import * as React from "react";
import type { SVGProps } from "react";
const SvgCylinder = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><ellipse cx={12} cy={5} rx={9} ry={3} /><path d="M3 5v14a9 3 0 0 0 18 0V5" /></svg>;
export default SvgCylinder;