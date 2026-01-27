import * as React from "react";
import type { SVGProps } from "react";
const SvgDrum = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="m2 2 8 8M22 2l-8 8" /><ellipse cx={12} cy={9} rx={10} ry={5} /><path d="M7 13.4v7.9M12 14v8M17 13.4v7.9M2 9v8a10 5 0 0 0 20 0V9" /></svg>;
export default SvgDrum;