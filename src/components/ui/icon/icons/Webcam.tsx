import * as React from "react";
import type { SVGProps } from "react";
const SvgWebcam = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><circle cx={12} cy={10} r={8} /><circle cx={12} cy={10} r={3} /><path d="M7 22h10M12 22v-4" /></svg>;
export default SvgWebcam;