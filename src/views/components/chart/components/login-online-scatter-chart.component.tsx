'use client';

import { ScatterCorrelationChart } from '@/components';

type LoginOnlineScatterDatum = {
  loginCount: number;
  onlineCount: number;
  errorCount: number;
};

type LoginOnlineScatterChartProps = {
  data: LoginOnlineScatterDatum[];
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

export function LoginOnlineScatterChart({ data }: LoginOnlineScatterChartProps) {
  return (
    <ScatterCorrelationChart
      data={data}
      xDataKey='loginCount'
      yDataKey='onlineCount'
      zDataKey='errorCount'
      pointName='Login-Online Correlation'
      pointColor='var(--color-info)'
      xTickFormatter={(value) => formatNumber(value, 0)}
      yTickFormatter={(value) => formatNumber(value, 0)}
      tooltipValueFormatter={(value) => formatNumber(value, 0)}
    />
  );
}
