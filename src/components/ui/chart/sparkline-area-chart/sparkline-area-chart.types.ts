import { CSSProperties } from 'react';

export type SparklineAreaChartProps<TData extends Record<string, unknown>> = {
  data: TData[];
  xDataKey: Extract<keyof TData, string>;
  yDataKey: Extract<keyof TData, string>;
  color?: string;
  strokeWidth?: number;
  showTooltip?: boolean;
  valueFormatter?: (value: unknown) => string;
  tooltipLabelFormatter?: (label: unknown) => string;
  tooltipContentStyle?: CSSProperties;
};
