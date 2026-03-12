'use client';

import { AreaTrendChart } from '@/components';

type SuccessErrorAreaChartDatum = {
  timestamp: string;
  successCount: number;
  errorCount: number;
};

type SuccessErrorAreaChartProps = {
  data: SuccessErrorAreaChartDatum[];
  syncId: string;
  activeTimestamp: string | null;
  onHoverTimestampChange: (timestamp: string | null) => void;
};

const timeFormatter = new Intl.DateTimeFormat('tr-TR', {
  hour: '2-digit',
  minute: '2-digit',
});

const dateTimeFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

function formatTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : timeFormatter.format(date);
}

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateTimeFormatter.format(date);
}

function formatNumber(value: unknown, precision = 0) {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return '-';
  }

  return new Intl.NumberFormat('tr-TR', {
    maximumFractionDigits: precision,
    minimumFractionDigits: precision,
  }).format(numericValue);
}

function getPaddedDomain(values: number[], ratio = 0.1): [number, number] {
  if (!values.length) {
    return [0, 1];
  }

  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) {
    const offset = min === 0 ? 1 : Math.abs(min) * ratio;
    return [Math.max(0, min - offset), max + offset];
  }

  const padding = (max - min) * ratio;
  return [Math.max(0, min - padding), max + padding];
}

export function SuccessErrorAreaChart({
  data,
  syncId,
  activeTimestamp,
  onHoverTimestampChange,
}: SuccessErrorAreaChartProps) {
  const totalVolumeDomain = getPaddedDomain(data.map((item) => item.successCount + item.errorCount));

  return (
    <AreaTrendChart
      data={data}
      xDataKey='timestamp'
      syncId={syncId}
      activeXValue={activeTimestamp}
      onHoverXValueChange={onHoverTimestampChange}
      xTickFormatter={formatTime}
      yTickFormatter={(value) => formatNumber(value, 0)}
      tooltipLabelFormatter={(label) => formatDateTime(String(label))}
      yWidth={56}
      yDomain={totalVolumeDomain}
      series={[
        {
          dataKey: 'errorCount',
          name: 'Error',
          color: 'var(--color-danger)',
          stackId: 'total',
          fillOpacity: 0.24,
          valueFormatter: (value) => formatNumber(value, 0),
        },
        {
          dataKey: 'successCount',
          name: 'Success',
          color: 'var(--color-success)',
          stackId: 'total',
          fillOpacity: 0.2,
          valueFormatter: (value) => formatNumber(value, 0),
        },
      ]}
    />
  );
}
