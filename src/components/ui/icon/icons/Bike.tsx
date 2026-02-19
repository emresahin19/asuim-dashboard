import * as React from "react";
import type { SVGProps } from "react";
const SvgBike = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="var(--icon-stroke-width)" viewBox="0 0 24 24" {...props}><circle cx={18.5} cy={17.5} r={3.5} /><circle cx={5.5} cy={17.5} r={3.5} /><circle cx={15} cy={5} r={1} /><path d="M12 17.5V14l-3-3 4-3 2 3h2" /></svg>;
export default SvgBike;