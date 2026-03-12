'use client';

import { LineChart } from '@/components';

type LoginOnlineChartDatum = {
  timestamp: string;
  loginCount: number;
  onlineCount: number;
};

type LoginOnlineChartProps = {
  data: LoginOnlineChartDatum[];
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

function getPaddedDomain(values: number[], ratio = 0.12): [number, number] {
  if (!values.length) {
    return [0, 1];
  }

  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) {
    const offset = min === 0 ? 1 : Math.abs(min) * ratio;
    return [min - offset, max + offset];
  }

  const padding = (max - min) * ratio;
  const paddedMin = Math.max(0, min - padding);
  const paddedMax = Math.min(100, max + padding);
  
  return [paddedMin, paddedMax];
}

export function LoginOnlineChart({
  data,
  syncId,
  activeTimestamp,
  onHoverTimestampChange,
}: LoginOnlineChartProps) {
  const activityDomain = getPaddedDomain([
    ...data.map((item) => item.loginCount),
    ...data.map((item) => item.onlineCount),
  ]);
  
  return (
    <LineChart
      data={data}
      xDataKey='timestamp'
      syncId={syncId}
      activeXValue={activeTimestamp}
      onHoverXValueChange={onHoverTimestampChange}
      xTickFormatter={formatTime}
      yTickFormatter={(value) => formatNumber(value, 0)}
      tooltipLabelFormatter={(label) => formatDateTime(String(label))}
      yWidth={52}
      yDomain={activityDomain}
      series={[
        {
          dataKey: 'loginCount',
          name: 'Login Count',
          color: 'var(--color-accent)',
          valueFormatter: (value) => formatNumber(value, 0),
        },
        {
          dataKey: 'onlineCount',
          name: 'Online Count',
          color: 'var(--color-warning)',
          valueFormatter: (value) => formatNumber(value, 0),
        },
      ]}
    />
  );
}
