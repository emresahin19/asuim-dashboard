'use client';

import { useMemo } from 'react';
import { SparklineAreaChart } from '@/components';

type IncomeSparklineChartDatum = {
  timestamp: string;
  loginCount: number;
  onlineCount: number;
};

type IncomeSparklineChartPoint = {
  timestamp: string;
  income: number;
};

type IncomeSparklineChartProps = {
  data: IncomeSparklineChartDatum[];
};

const dateTimeFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateTimeFormatter.format(date);
}

function formatIncomeValue(value: unknown) {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return '$0';
  }

  return `$${compactCurrencyFormatter.format(numericValue)}`;
}

function toIncomePoints(data: IncomeSparklineChartDatum[]): IncomeSparklineChartPoint[] {
  const points = data.slice(-12);
  const maxIndex = Math.max(points.length - 1, 1);

  return points.map((item, index) => {
    const ratio = index / maxIndex;
    const wave = Math.sin(ratio * Math.PI * 4) * 4200;
    const baseIncome = item.loginCount * 120 + item.onlineCount * 95;

    return {
      timestamp: item.timestamp,
      income: Math.max(0, Math.round(baseIncome + wave + 150000)),
    };
  });
}

export function IncomeSparklineChart({ data }: IncomeSparklineChartProps) {
  const incomeSeries = useMemo(() => toIncomePoints(data), [data]);

  return (
    <SparklineAreaChart
      data={incomeSeries}
      xDataKey='timestamp'
      yDataKey='income'
      color='#00d7a4'
      strokeWidth={2.25}
      valueFormatter={formatIncomeValue}
      tooltipLabelFormatter={(label) => formatDateTime(String(label))}
    />
  );
}
