import * as React from "react";
import type { SVGProps } from "react";
const SvgListTodo = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path d="M13 5h8M13 12h8M13 19h8M3 17l2 2 4-4" /><rect width={6} height={6} x={3} y={4} rx={1} /></svg>;
export default SvgListTodo;