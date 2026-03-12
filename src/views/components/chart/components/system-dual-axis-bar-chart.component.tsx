"use client";

import { AxisBarChart } from '@/components';

type SystemAxisBarChartDatum = {
  timestamp: string;
  successCount: number;
  errorCount: number;
};

type SystemAxisBarChartProps = {
  data: SystemAxisBarChartDatum[];
  syncId: string;
  activeTimestamp: string | null;
  onHoverTimestampChange: (timestamp: string | null) => void;
};

const timeFormatter = new Intl.DateTimeFormat("tr-TR", {
  hour: "2-digit",
  minute: "2-digit",
});

const dateTimeFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
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
    return "-";
  }

  return new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: precision,
    minimumFractionDigits: precision,
  }).format(numericValue);
}

export function SystemAxisBarChart({
  data,
  syncId,
  activeTimestamp,
  onHoverTimestampChange,
}: SystemAxisBarChartProps) {
  return (
    <AxisBarChart
      data={data}
      xDataKey='timestamp'
      syncId={syncId}
      activeXValue={activeTimestamp}
      onHoverXValueChange={onHoverTimestampChange}
      xTickFormatter={formatTime}
      tooltipLabelFormatter={(label) => formatDateTime(String(label))}
      leftAxis={{
        width: 52,
        tickFormatter: (value) => `${formatNumber(value, 0)}`,
      }}
      rightAxis={{
        width: 44,
        tickFormatter: (value) => `${formatNumber(value, 0)}`,
      }}
      series={[
        {
          dataKey: 'successCount',
          yAxisId: 'left',
          name: 'Success',
          color: 'var(--color-success)',
          valueFormatter: (value) => formatNumber(value, 0),
        },
        {
          dataKey: 'errorCount',
          yAxisId: 'right',
          name: 'Error',
          color: 'var(--color-danger)',
          valueFormatter: (value) => formatNumber(value, 0),
        },
      ]}
    />
  );
}
