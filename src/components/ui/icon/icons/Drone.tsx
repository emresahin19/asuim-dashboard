import * as React from "react";
import type { SVGProps } from "react";
const SvgDrone = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M10 10 7 7M10 14l-3 3M14 10l3-3M14 14l3 3M14.205 4.139a4 4 0 1 1 5.439 5.863M19.637 14a4 4 0 1 1-5.432 5.868M4.367 10a4 4 0 1 1 5.438-5.862M9.795 19.862a4 4 0 1 1-5.429-5.873" /><rect width={4} height={8} x={10} y={8} rx={1} /></svg>;
export default SvgDrone;