import * as React from "react";
import type { SVGProps } from "react";
const SvgPodcast = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 0 0 1 0z" /><path d="M16.85 18.58a9 9 0 1 0-9.7 0" /><path d="M8 14a5 5 0 1 1 8 0" /><circle cx={12} cy={11} r={1} fill="currentColor" /></svg>;
export default SvgPodcast;