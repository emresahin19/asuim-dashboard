import * as React from "react";
import type { SVGProps } from "react";
const SvgCone = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98" /><ellipse cx={12} cy={19} rx={9} ry={3} /></svg>;
export default SvgCone;