import { CSSProperties } from 'react';

export type ScatterCorrelationChartProps<TData extends Record<string, unknown>> = {
  data: TData[];
  xDataKey: Extract<keyof TData, string>;
  yDataKey: Extract<keyof TData, string>;
  zDataKey?: Extract<keyof TData, string>;
  pointName?: string;
  pointColor?: string;
  xTickFormatter?: (value: unknown) => string;
  yTickFormatter?: (value: unknown) => string;
  tooltipLabelFormatter?: (label: unknown) => string;
  tooltipValueFormatter?: (value: unknown) => string;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  tooltipContentStyle?: CSSProperties;
  tooltipLabelStyle?: CSSProperties;
};
