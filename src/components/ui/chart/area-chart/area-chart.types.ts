import { CSSProperties } from 'react';

type DomainValue = number | 'auto' | 'dataMin' | 'dataMax';

export type AreaChartSeries<TData extends Record<string, unknown>> = {
  dataKey: Extract<keyof TData, string>;
  name?: string;
  color: string;
  stackId?: string;
  strokeWidth?: number;
  fillOpacity?: number;
  valueFormatter?: (value: unknown) => string;
};

export type AreaTrendChartProps<TData extends Record<string, unknown>> = {
  data: TData[];
  xDataKey: Extract<keyof TData, string>;
  series: AreaChartSeries<TData>[];
  syncId?: string;
  activeXValue?: string | null;
  onHoverXValueChange?: (value: string | null) => void;
  xTickFormatter?: (value: string) => string;
  yTickFormatter?: (value: unknown) => string;
  tooltipLabelFormatter?: (label: unknown) => string;
  yWidth?: number;
  yDomain?: [DomainValue, DomainValue];
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  tooltipContentStyle?: CSSProperties;
  tooltipLabelStyle?: CSSProperties;
};
