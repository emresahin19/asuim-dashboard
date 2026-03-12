'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { LineChartProps } from './line-chart.types';
import { getSharedChartTooltipProps } from '../shared';

function formatDefaultNumber(value: unknown) {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return '-';
  }

  return new Intl.NumberFormat('tr-TR', {
    maximumFractionDigits: 2,
  }).format(numericValue);
}

export function LineChart<TData extends Record<string, unknown>>({
  data,
  xDataKey,
  series,
  syncId,
  activeXValue,
  onHoverXValueChange,
  xTickFormatter,
  yTickFormatter,
  tooltipLabelFormatter,
  yWidth = 56,
  yDomain,
  margin = { top: 8, right: 10, bottom: 6, left: 2 },
  tooltipContentStyle,
  tooltipLabelStyle,
}: LineChartProps<TData>) {
  const [hiddenSeriesMap, setHiddenSeriesMap] = useState<Record<string, boolean>>({});
  const lastHoverXValueRef = useRef<string | null>(null);

  const seriesByKey = useMemo(() => {
    return series.reduce<Record<string, (typeof series)[number]>>((acc, item) => {
      acc[item.dataKey] = item;
      return acc;
    }, {});
  }, [series]);

  const handleMouseMove = useCallback(
    (state?: { activeLabel?: unknown }) => {
      if (!onHoverXValueChange) {
        return;
      }

      const nextXValue = typeof state?.activeLabel === 'string' ? state.activeLabel : null;

      if (nextXValue === lastHoverXValueRef.current) {
        return;
      }

      lastHoverXValueRef.current = nextXValue;
      onHoverXValueChange(nextXValue);
    },
    [onHoverXValueChange],
  );

  const handleMouseLeave = useCallback(() => {
    if (!onHoverXValueChange) {
      return;
    }

    if (lastHoverXValueRef.current === null) {
      return;
    }

    lastHoverXValueRef.current = null;
    onHoverXValueChange(null);
  }, [onHoverXValueChange]);

  const handleLegendClick = useCallback(
    (entry: { dataKey?: string | number | ((obj: unknown) => unknown) }) => {
      const key = typeof entry.dataKey === 'string' ? entry.dataKey : null;

      if (!key) {
        return;
      }

      setHiddenSeriesMap((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    },
    [],
  );

  const legendFormatter = useCallback(
    (value: string | number) => {
      const key = String(value);
      return seriesByKey[key]?.name ?? value;
    },
    [seriesByKey],
  );

  const tooltipLabelFormatterSafe = useCallback(
    (label: unknown) => (tooltipLabelFormatter ? tooltipLabelFormatter(label) : String(label)),
    [tooltipLabelFormatter],
  );

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RechartsLineChart
        data={data}
        syncId={syncId}
        syncMethod='value'
        margin={margin}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >

        <XAxis
          dataKey={xDataKey}
          tickFormatter={(value) => (xTickFormatter ? xTickFormatter(String(value)) : String(value))}
          tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          domain={yDomain}
          tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={yWidth}
          tickFormatter={(value) => (yTickFormatter ? yTickFormatter(value) : formatDefaultNumber(value))}
        />

        {activeXValue ? (
          <ReferenceLine x={activeXValue} stroke='var(--color-info)' strokeOpacity={0.5} />
        ) : null}

        <Tooltip
          {...getSharedChartTooltipProps({
            tooltipContentStyle,
            tooltipLabelStyle,
          })}
          formatter={(value, name, item) => {
            const key =
              typeof item?.dataKey === 'string'
                ? item.dataKey
                : typeof name === 'string'
                  ? name
                  : String(name ?? '');

            if (hiddenSeriesMap[key]) {
              return null;
            }

            const lineSeries = seriesByKey[key];
            return [
              lineSeries?.valueFormatter ? lineSeries.valueFormatter(value) : formatDefaultNumber(value),
              lineSeries?.name ?? key,
            ];
          }}
          labelFormatter={tooltipLabelFormatterSafe}
        />

        <Legend
          verticalAlign='bottom'
          align='center'
          iconType='circle'
          wrapperStyle={{ 
            paddingTop: '10px', 
            userSelect: 'none',
            cursor: 'pointer',
          }}
          formatter={legendFormatter}
          onClick={handleLegendClick}
        />

        {series.map((lineSeries) => (
          <Line
            key={lineSeries.dataKey}
            type='monotone'
            dataKey={lineSeries.dataKey}
            stroke={lineSeries.color}
            strokeWidth={lineSeries.strokeWidth ?? 2.5}
            hide={Boolean(hiddenSeriesMap[lineSeries.dataKey])}
            dot={false}
            activeDot={{ r: 5 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
