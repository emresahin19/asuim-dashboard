import * as React from "react";
import type { SVGProps } from "react";
const SvgTheater = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M2 10s3-3 3-8M22 10s-3-3-3-8" /><path d="M10 2c0 4.4-3.6 8-8 8M14 2c0 4.4 3.6 8 8 8M2 10s2 2 2 5M22 10s-2 2-2 5M8 15h8M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" /></svg>;
export default SvgTheater;