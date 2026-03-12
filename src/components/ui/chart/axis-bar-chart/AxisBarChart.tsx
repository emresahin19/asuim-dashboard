'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AxisBarChartProps } from './axis-bar-chart.types';

function formatDefaultNumber(value: unknown) {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return '-';
  }

  return new Intl.NumberFormat('tr-TR', {
    maximumFractionDigits: 2,
  }).format(numericValue);
}

export function AxisBarChart<TData extends Record<string, unknown>>({
  data,
  xDataKey,
  series,
  syncId,
  activeXValue,
  onHoverXValueChange,
  xTickFormatter,
  tooltipLabelFormatter,
  margin = { top: 8, right: 10, bottom: 6, left: 2 },
  leftAxis,
  rightAxis,
  normalBarSize = 11,
  expandedBarSize = 22,
  tooltipContentStyle,
  tooltipLabelStyle,
}: AxisBarChartProps<TData>) {
  const [hiddenSeriesMap, setHiddenSeriesMap] = useState<Record<string, boolean>>({});
  const lastHoverXValueRef = useRef<string | null>(null);

  const seriesByKey = useMemo(() => {
    return series.reduce<Record<string, (typeof series)[number]>>((acc, item) => {
      acc[item.dataKey] = item;
      return acc;
    }, {});
  }, [series]);

  const visibleSeriesCount = useMemo(() => {
    return series.filter((item) => !hiddenSeriesMap[item.dataKey]).length;
  }, [hiddenSeriesMap, series]);

  const usesRightAxis = useMemo(() => {
    return series.some((item) => (item.yAxisId ?? 'left') === 'right');
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

  const tooltipFormatter = useCallback(
    (value: unknown, name: unknown) => {
      const key = String(name ?? '');

      if (hiddenSeriesMap[key]) {
        return null;
      }

      const barSeries = seriesByKey[key];

      return [
        barSeries?.valueFormatter ? barSeries.valueFormatter(value) : formatDefaultNumber(value),
        barSeries?.name ?? key,
      ];
    },
    [hiddenSeriesMap, seriesByKey],
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
      <ComposedChart
        data={data}
        syncId={syncId}
        syncMethod='value'
        margin={margin}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <CartesianGrid vertical={false} stroke='var(--color-border-soft)' />

        <XAxis
          dataKey={xDataKey}
          tickFormatter={(value) => (xTickFormatter ? xTickFormatter(String(value)) : String(value))}
          tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          yAxisId='left'
          width={leftAxis?.width ?? 52}
          tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) =>
            leftAxis?.tickFormatter ? leftAxis.tickFormatter(value) : formatDefaultNumber(value)
          }
          unit={leftAxis?.unit}
          domain={leftAxis?.domain}
        />

        {usesRightAxis ? (
          <YAxis
            yAxisId='right'
            orientation='right'
            width={rightAxis?.width ?? 44}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) =>
              rightAxis?.tickFormatter ? rightAxis.tickFormatter(value) : formatDefaultNumber(value)
            }
            unit={rightAxis?.unit}
            domain={rightAxis?.domain}
          />
        ) : null}

        {activeXValue ? (
          <ReferenceLine x={activeXValue} stroke='var(--color-info)' strokeOpacity={0.5} />
        ) : null}

        <Tooltip
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
          formatter={tooltipFormatter}
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

        {series.map((barSeries) => (
          <Bar
            key={barSeries.dataKey}
            yAxisId={barSeries.yAxisId ?? 'left'}
            dataKey={barSeries.dataKey}
            fill={barSeries.color}
            radius={barSeries.radius ?? [4, 4, 0, 0]}
            hide={Boolean(hiddenSeriesMap[barSeries.dataKey])}
            barSize={visibleSeriesCount <= 1 ? expandedBarSize : normalBarSize}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
