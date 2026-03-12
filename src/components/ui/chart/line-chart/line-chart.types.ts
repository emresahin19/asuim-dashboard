import { CSSProperties } from 'react';

type DomainValue = number | 'auto' | 'dataMin' | 'dataMax';

export type LineChartSeries<TData extends Record<string, unknown>> = {
  dataKey: Extract<keyof TData, string>;
  name?: string;
  color: string;
  strokeWidth?: number;
  valueFormatter?: (value: unknown) => string;
};

export type LineChartProps<TData extends Record<string, unknown>> = {
  data: TData[];
  xDataKey: Extract<keyof TData, string>;
  series: LineChartSeries<TData>[];
  syncId?: string;
  activeXValue?: string | null;
  onHoverXValueChange?: (value: string | null) => void;
  xTickFormatter?: (value: string) => string;
  yTickFormatter?: (value: unknown) => string;
  tooltipLabelFormatter?: (label: unknown) => string;
  yWidth?: number;
  yDomain?: [DomainValue, DomainValue];
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  className?: string;
  tooltipContentStyle?: CSSProperties;
  tooltipLabelStyle?: CSSProperties;
};
