import * as React from "react";
import type { SVGProps } from "react";
const SvgParkingMeter = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><path d="M11 15h2M12 12v3M12 19v3M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z" /><path d="M9 9a3 3 0 1 1 6 0" /></svg>;
export default SvgParkingMeter;