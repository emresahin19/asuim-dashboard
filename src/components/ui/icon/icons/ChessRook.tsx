import * as React from "react";
import type { SVGProps } from "react";
const SvgChessRook = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zM10 2v2M14 2v2M17 18l-1-9M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2M6 4h12M7 18l1-9" /></svg>;
export default SvgChessRook;