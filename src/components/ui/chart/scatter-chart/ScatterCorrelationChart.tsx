'use client';

import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import { ScatterCorrelationChartProps } from './scatter-chart.types';

function formatDefaultNumber(value: unknown) {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return '-';
  }

  return new Intl.NumberFormat('tr-TR', {
    maximumFractionDigits: 2,
  }).format(numericValue);
}

export function ScatterCorrelationChart<TData extends Record<string, unknown>>({
  data,
  xDataKey,
  yDataKey,
  zDataKey,
  pointName = 'Data Points',
  pointColor = 'var(--color-accent)',
  xTickFormatter,
  yTickFormatter,
  tooltipLabelFormatter,
  tooltipValueFormatter,
  margin = { top: 10, right: 10, bottom: 8, left: 4 },
  tooltipContentStyle,
  tooltipLabelStyle,
}: ScatterCorrelationChartProps<TData>) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <ScatterChart margin={margin}>
        <CartesianGrid stroke='var(--color-border-soft)' />

        <XAxis
          dataKey={xDataKey}
          type='number'
          tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => (xTickFormatter ? xTickFormatter(value) : formatDefaultNumber(value))}
        />

        <YAxis
          dataKey={yDataKey}
          type='number'
          tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => (yTickFormatter ? yTickFormatter(value) : formatDefaultNumber(value))}
        />

        {zDataKey ? <ZAxis dataKey={zDataKey} range={[70, 280]} /> : null}

        <Tooltip
          cursor={{ stroke: 'var(--color-info)', strokeOpacity: 0.4 }}
          contentStyle={{
            background: 'var(--color-bg-glass)',
            border: '1px solid var(--color-border)',
            borderRadius: 12,
            boxShadow: 'var(--card-shadow)',
            ...tooltipContentStyle,
          }}
          wrapperStyle={{
            backdropFilter: 'blur(8px)',
          }}
          labelStyle={{ color: 'var(--color-text-soft)', marginBottom: 8, ...tooltipLabelStyle }}
          labelFormatter={(label: unknown) =>
            tooltipLabelFormatter ? tooltipLabelFormatter(label) : String(label)
          }
          formatter={(value: unknown) =>
            tooltipValueFormatter ? tooltipValueFormatter(value) : formatDefaultNumber(value)
          }
        />

        <Legend
          verticalAlign='bottom'
          align='center'
          iconType='circle'
          wrapperStyle={{
            paddingTop: '10px',
          }}
        />

        <Scatter name={pointName} data={data} fill={pointColor} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
