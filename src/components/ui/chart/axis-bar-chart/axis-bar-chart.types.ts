import { CSSProperties } from 'react';

type DomainValue = number | 'auto' | 'dataMin' | 'dataMax';

export type AxisBarChartSeries<TData extends Record<string, unknown>> = {
  dataKey: Extract<keyof TData, string>;
  name?: string;
  color: string;
  yAxisId?: 'left' | 'right';
  valueFormatter?: (value: unknown) => string;
  radius?: [number, number, number, number];
};

export type AxisBarAxisConfig = {
  width?: number;
  tickFormatter?: (value: unknown) => string;
  unit?: string;
  domain?: [DomainValue, DomainValue];
};

export type AxisBarChartProps<TData extends Record<string, unknown>> = {
  data: TData[];
  xDataKey: Extract<keyof TData, string>;
  series: AxisBarChartSeries<TData>[];
  syncId?: string;
  activeXValue?: string | null;
  onHoverXValueChange?: (value: string | null) => void;
  xTickFormatter?: (value: string) => string;
  tooltipLabelFormatter?: (label: unknown) => string;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  leftAxis?: AxisBarAxisConfig;
  rightAxis?: AxisBarAxisConfig;
  normalBarSize?: number;
  expandedBarSize?: number;
  tooltipContentStyle?: CSSProperties;
  tooltipLabelStyle?: CSSProperties;
};
