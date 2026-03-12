import { CSSProperties } from 'react';

export type DonutChartSlice = {
  id: string;
  name: string;
  value: number;
  color: string;
};

export type DonutDistributionChartProps = {
  data: DonutChartSlice[];
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  tooltipValueFormatter?: (value: unknown) => string;
  tooltipContentStyle?: CSSProperties;
  tooltipLabelStyle?: CSSProperties;
};
