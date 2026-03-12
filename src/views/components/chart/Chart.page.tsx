'use client';

import { useMemo, useState } from 'react';
import { Card, Grid, GridItem } from '@/components';
import loginData from './data/login-data.json';
import { LoginOnlineChart, SystemAxisBarChart } from './components';
import styles from './chart.module.scss';

type LoginMetricsRecord = {
  timestamp: string;
  loginCount: number;
  onlineCount: number;
  successCount: number;
  errorCount: number;
};

const chartSyncId = 'monitoring-charts';

function formatCompactTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function ChartPage() {
  const [activeTimestamp, setActiveTimestamp] = useState<string | null>(null);

  const loginMetricsData = useMemo<LoginMetricsRecord[]>(
    () =>
      loginData.map((item) => ({
        timestamp: item.timestamp,
        loginCount: Number(item.loginCount),
        onlineCount: Number(item.onlineCount),
        successCount: Number(item.successCount),
        errorCount: Number(item.errorCount),
      })),
    [],
  );

  const summary = useMemo(() => {
    const latestPoint = loginMetricsData.at(-1);
    const activePoint = activeTimestamp
      ? loginMetricsData.find((item) => item.timestamp === activeTimestamp)
      : latestPoint;

    return {
      timestamp: activeTimestamp ?? latestPoint?.timestamp ?? null,
      loginCount: activePoint?.loginCount ?? latestPoint?.loginCount ?? 0,
      onlineCount: activePoint?.onlineCount ?? latestPoint?.onlineCount ?? 0,
      errorCount: activePoint?.errorCount ?? latestPoint?.errorCount ?? 0,
    };
  }, [activeTimestamp, loginMetricsData]);

  return (
    <div className={styles.page}>
      <Card className={styles.heroCard} variant="gradient">
        <p className={styles.overline}>Components</p>
        <h1 className={styles.title}>Interactive Monitoring Charts</h1>
        <p className={styles.subtitle}>
          Bu sayfa, ayni zaman noktasini birden fazla grafikte es zamanli takip edebilecegin bir
          monitoring deneyimi sunar. Grafiklerden birine hover yaptiginda diger grafikte de ayni
          nokta vurgulanir.
        </p>

        <div className={styles.kpiRow}>
          <div className={styles.kpiItem}>
            <span className={styles.kpiLabel}>Login Count</span>
            <strong>{summary.loginCount.toFixed(0)}</strong>
          </div>
          <div className={styles.kpiItem}>
            <span className={styles.kpiLabel}>Online Count</span>
            <strong>{summary.onlineCount.toFixed(0)}</strong>
          </div>
          <div className={styles.kpiItem}>
            <span className={styles.kpiLabel}>Error Count</span>
            <strong>{summary.errorCount.toFixed(0)}</strong>
          </div>
        </div>

        {summary.timestamp ? (
          <p className={styles.activeTimestamp}>
            Aktif zaman: <span>{formatCompactTime(summary.timestamp)}</span>
          </p>
        ) : null}
      </Card>

      <Grid withGap className={styles.sectionGrid}>
        <GridItem xs={1} sm={2}>
          <Card className={styles.chartCard}>
            <div className={styles.sectionHead}>
              <h2>Login vs Online</h2>
              <p>login ve online kullanici serilerinin ikili trend karsilastirmasi</p>
              <span className={styles.sectionTag}>correlated pair</span>
            </div>
            <div className={styles.chartWrap}>
              <LoginOnlineChart
                data={loginMetricsData}
                syncId={chartSyncId}
                activeTimestamp={activeTimestamp}
                onHoverTimestampChange={setActiveTimestamp}
              />
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.chartCard}>
            <div className={styles.sectionHead}>
              <h2>Infra Node Resource Bars</h2>
              <p>memory ve cpu metriklerinin ikili bar chart gorunumu</p>
              <span className={styles.sectionTag}>dual bar metrics</span>
            </div>
            <div className={styles.chartWrap}>
              <SystemAxisBarChart
                data={loginMetricsData}
                syncId={chartSyncId}
                activeTimestamp={activeTimestamp}
                onHoverTimestampChange={setActiveTimestamp}
              />
            </div>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}
