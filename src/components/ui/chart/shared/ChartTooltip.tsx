'use client';

import { CSSProperties } from 'react';

type SharedChartTooltipOptions = {
  tooltipContentStyle?: CSSProperties;
  tooltipLabelStyle?: CSSProperties;
  labelStyleOverrides?: CSSProperties;
};

export function getSharedChartTooltipProps({
  tooltipContentStyle,
  tooltipLabelStyle,
  labelStyleOverrides,
}: SharedChartTooltipOptions) {
  return {
    contentStyle: {
      background: 'transparent',
      border: 0,
      ...tooltipContentStyle,
    },
    wrapperStyle: {
      backdropFilter: 'blur(8px)',
      borderRadius: 12,
      background: 'var(--color-bg-glass)',
      boxShadow: 'var(--card-shadow)',
    },
    labelStyle: {
      color: 'var(--color-text-soft)',
      marginBottom: 8,
      ...tooltipLabelStyle,
      ...labelStyleOverrides,
    },
  };
}
