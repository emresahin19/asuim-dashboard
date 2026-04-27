'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { DonutDistributionChartProps } from './donut-chart.types';
import { getSharedChartTooltipProps } from '../shared';

function formatDefaultNumber(value: unknown) {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return '-';
  }

  return new Intl.NumberFormat('tr-TR', {
    maximumFractionDigits: 0,
  }).format(numericValue);
}

export function DonutDistributionChart({
  data,
  innerRadius = 52,
  outerRadius = 78,
  paddingAngle = 2,
  tooltipValueFormatter,
  tooltipContentStyle,
  tooltipLabelStyle,
}: DonutDistributionChartProps) {
  return (
    <ResponsiveContainer width='100%' height='100%' initialDimension={{ width: 100, height: 50 }}>
      <PieChart>
        <Tooltip
          {...getSharedChartTooltipProps({
            tooltipContentStyle,
            tooltipLabelStyle,
          })}
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

        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          stroke='var(--color-bg-elevated)'
          strokeWidth={2}
        >
          {data.map((slice) => (
            <Cell key={slice.id} fill={slice.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
