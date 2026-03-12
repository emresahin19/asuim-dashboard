'use client';

import { useMemo } from 'react';
import { DonutDistributionChart } from '@/components';

type TrafficShareDonutChartDatum = {
  loginCount: number;
  onlineCount: number;
  errorCount: number;
};

type TrafficShareDonutChartProps = {
  data: TrafficShareDonutChartDatum[];
};

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

export function TrafficShareDonutChart({ data }: TrafficShareDonutChartProps) {
  const donutData = useMemo(() => {
    const totalOnline = data.reduce((sum, item) => sum + item.onlineCount, 0);
    const totalIdle = data.reduce(
      (sum, item) => sum + Math.max(0, item.loginCount - item.onlineCount),
      0,
    );
    const totalError = data.reduce((sum, item) => sum + item.errorCount, 0);

    return [
      {
        id: 'online',
        name: 'Online Session',
        value: totalOnline,
        color: 'var(--color-accent)',
      },
      {
        id: 'idle',
        name: 'Idle Session',
        value: totalIdle,
        color: 'var(--color-warning)',
      },
      {
        id: 'error',
        name: 'Error Session',
        value: totalError,
        color: 'var(--color-danger)',
      },
    ];
  }, [data]);

  return (
    <DonutDistributionChart
      data={donutData}
      innerRadius={56}
      outerRadius={84}
      tooltipValueFormatter={(value) => `${formatNumber(value, 0)} events`}
    />
  );
}
