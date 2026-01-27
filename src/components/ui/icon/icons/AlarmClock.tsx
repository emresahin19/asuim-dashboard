import * as React from "react";
import type { SVGProps } from "react";
const SvgAlarmClock = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" {...props}><circle cx={12} cy={13} r={8} /><path d="M12 9v4l2 2M5 3 2 6M22 6l-3-3M6.38 18.7 4 21M17.64 18.67 20 21" /></svg>;
export default SvgAlarmClock;