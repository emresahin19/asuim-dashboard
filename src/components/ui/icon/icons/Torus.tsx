import * as React from "react";
import type { SVGProps } from "react";
const SvgTorus = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><ellipse cx={12} cy={11} rx={3} ry={2} /><ellipse cx={12} cy={12.5} rx={10} ry={8.5} /></svg>;
export default SvgTorus;