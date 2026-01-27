import * as React from "react";
import type { SVGProps } from "react";
const SvgFileOutput = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127" /><path d="M14 2v5a1 1 0 0 0 1 1h5M5 11l-3 3M5 17l-3-3h10" /></svg>;
export default SvgFileOutput;