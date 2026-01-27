import * as React from "react";
import type { SVGProps } from "react";
const SvgCode = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>;
export default SvgCode;