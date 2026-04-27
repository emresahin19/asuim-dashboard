'use client';

import { useId } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { SparklineAreaChartProps } from './sparkline-area-chart.types';
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

export function SparklineAreaChart<TData extends Record<string, unknown>>({
    data,
    xDataKey,
    yDataKey,
    color = 'var(--color-accent)',
    strokeWidth = 2,
    showTooltip = true,
    valueFormatter,
    tooltipLabelFormatter,
    tooltipContentStyle,
}: SparklineAreaChartProps<TData>) {
    const gradientId = useId().replace(/:/g, '');

    return (
        <ResponsiveContainer width='100%' height='100%' initialDimension={{ width: 100, height: 50 }}>
            <AreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id={gradientId} x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='0%' stopColor={color} stopOpacity={0.36} />
                        <stop offset='100%' stopColor={color} stopOpacity={0.02} />
                    </linearGradient>
                </defs>

                {showTooltip ? (
                    <Tooltip
                        {...getSharedChartTooltipProps({
                            tooltipContentStyle,
                            labelStyleOverrides: { marginBottom: 6 },
                        })}
                        cursor={{ stroke: color, strokeOpacity: 0.35, strokeWidth: 1 }}
                        labelFormatter={(label) =>
                            tooltipLabelFormatter ? tooltipLabelFormatter(label) : String(label)
                        }
                        formatter={(value) =>
                            valueFormatter ? valueFormatter(value) : formatDefaultNumber(value)
                        }
                    />
                ) : null}

                <Area
                    type='monotone'
                    dataKey={yDataKey}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill={`url(#${gradientId})`}
                    dot={false}
                    activeDot={{ r: 4, fill: color, stroke: '#0f172a', strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={420}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
