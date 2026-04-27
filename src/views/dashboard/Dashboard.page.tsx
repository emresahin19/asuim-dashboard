'use client';

import { useState } from 'react';
import {
  LineChart,
  AxisBarChart,
  SparklineAreaChart,
} from '@/components/ui/chart';
import styles from './dashboard.module.scss';

// ─── Dummy helpers ───────────────────────────────────────────────────────────

function makeDailyChart(days: number, base: number, variance: number) {
  const now = new Date();
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (days - 1 - i));
    return {
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      count: Math.max(0, base + Math.round((Math.random() - 0.4) * variance)),
    };
  });
}

function makeMonthlyChart(months: number, base: number, step: number) {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  return Array.from({ length: months }, (_, i) => {
    const idx = (now.getMonth() - months + 1 + i + 12) % 12;
    return { month: labels[idx], mrr: base + step * i + Math.round(Math.random() * 800) };
  });
}

function growthPercent(chart: { count: number }[]): number | null {
  if (chart.length < 2) return null;
  const half = Math.floor(chart.length / 2);
  const prev = chart.slice(0, half).reduce((s, p) => s + p.count, 0);
  const curr = chart.slice(half).reduce((s, p) => s + p.count, 0);
  if (prev === 0) return curr > 0 ? 100 : 0;
  return Math.round(((curr - prev) / prev) * 100);
}

function formatCents(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

// ─── Dummy data ───────────────────────────────────────────────────────────────

const accountsChart = makeDailyChart(30, 12, 8);
const appsChart     = makeDailyChart(30, 5, 4);
const usersChart    = makeDailyChart(30, 48, 30);
const sessionsChart = makeDailyChart(30, 220, 120);

const mrrHistory = makeMonthlyChart(12, 18000, 1200);
const dailyRevenue = makeDailyChart(30, 1800, 900).map((d) => ({ date: d.date, amount: d.count * 100 }));

const freeChart     = makeDailyChart(30, 35, 15);
const standardChart = makeDailyChart(30, 18, 8);
const enterpriseChart = makeDailyChart(30, 4, 2);

const growthChart30d = makeDailyChart(30, 0, 0).map((d) => ({
  date: d.date,
  newUsers:    Math.round(Math.random() * 60 + 10),
  newAccounts: Math.round(Math.random() * 15 + 2),
}));

const growthChart7d = makeDailyChart(7, 0, 0).map((d) => ({
  date: d.date,
  newUsers:    Math.round(Math.random() * 80 + 20),
  newAccounts: Math.round(Math.random() * 20 + 4),
}));

const growthChart24h = Array.from({ length: 24 }, (_, i) => ({
  date: `${String(i).padStart(2, '0')}:00`,
  newUsers:    Math.round(Math.random() * 12 + 1),
  newAccounts: Math.round(Math.random() * 3),
}));

const providerDistribution = [
  { provider: 'Google',   loginCount: 3842 },
  { provider: 'Email',    loginCount: 2910 },
  { provider: 'GitHub',   loginCount: 1245 },
  { provider: 'Apple',    loginCount: 876 },
  { provider: 'LinkedIn', loginCount: 412 },
];

type ContactRow = { id: string; name: string; email: string; source: string; preview: string; createdAt: string };
const contacts: ContactRow[] = [
  { id: '1', name: 'Alice Morgan',  email: 'alice@example.com',  source: 'dash_feedback', preview: 'Love the new dashboard design, but...',    createdAt: new Date(Date.now() - 12 * 60000).toISOString() },
  { id: '2', name: 'Bob Carter',    email: 'bob@acme.io',        source: 'dash_error',    preview: 'Getting a 500 error on the billing page.', createdAt: new Date(Date.now() - 47 * 60000).toISOString() },
  { id: '3', name: 'Clara Davis',   email: 'clara@startup.dev',  source: 'dash_feature',  preview: 'Would be great to export CSV from...',      createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: '4', name: 'Dan Hughes',    email: 'dan@corp.co',        source: 'public_form',   preview: 'Hi, interested in the enterprise plan.',    createdAt: new Date(Date.now() - 5 * 3600000).toISOString() },
  { id: '5', name: 'Eva Chen',      email: 'eva@labs.io',        source: 'system_alert',  preview: 'Automated: rate limit exceeded for app.',  createdAt: new Date(Date.now() - 8 * 3600000).toISOString() },
];

type BillingRow = { id: string; accountName: string; plan: string; amount: number; status: string; createdAt: string };
const billingRows: BillingRow[] = [
  { id: 'b1', accountName: 'Acme Corp',       plan: 'enterprise', amount: 29900, status: 'paid',           createdAt: new Date(Date.now() - 18 * 60000).toISOString() },
  { id: 'b2', accountName: 'Startup Hub',     plan: 'standard',   amount: 4900,  status: 'paid',           createdAt: new Date(Date.now() - 55 * 60000).toISOString() },
  { id: 'b3', accountName: 'Dev Studio',      plan: 'standard',   amount: 4900,  status: 'failed',         createdAt: new Date(Date.now() - 3 * 3600000).toISOString() },
  { id: 'b4', accountName: 'Global Labs',     plan: 'enterprise', amount: 29900, status: 'paid',           createdAt: new Date(Date.now() - 6 * 3600000).toISOString() },
  { id: 'b5', accountName: 'SaaS Ventures',   plan: 'standard',   amount: 4900,  status: 'refunded',       createdAt: new Date(Date.now() - 9 * 3600000).toISOString() },
  { id: 'b6', accountName: 'OpenSource Ltd',  plan: 'free',       amount: 0,     status: 'paid',           createdAt: new Date(Date.now() - 14 * 3600000).toISOString() },
  { id: 'b7', accountName: 'NextGen AI',      plan: 'enterprise', amount: 29900, status: 'pending',        createdAt: new Date(Date.now() - 20 * 3600000).toISOString() },
];

// ─── Component ────────────────────────────────────────────────────────────────

type GrowthRange = '24h' | '7d' | '30d';

const growthData: Record<GrowthRange, typeof growthChart30d> = {
  '24h': growthChart24h,
  '7d':  growthChart7d,
  '30d': growthChart30d,
};

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function DashboardPage() {
  const [range, setRange] = useState<GrowthRange>('30d');

  return (
    <div className={styles.root}>

      {/* ── 1. 4-card stat grid ─────────────────────────────── */}
      <div className={styles.statGrid4}>
        <StatCard label="Total Accounts" total={4_218}  newThisMonth={134} chart={accountsChart} color="var(--color-accent)" />
        <StatCard label="Total Apps"     total={612}    newThisMonth={28}  chart={appsChart}     color="var(--color-success-text)" />
        <StatCard label="Total Users"    total={38_450} newThisMonth={1840} chart={usersChart}   color="var(--color-info, #3b82f6)" />
        <StatCard label="Active Sessions" total={1_923} newThisMonth={487} newLabel="today" chart={sessionsChart} color="var(--color-warning, #f59e0b)" />
      </div>

      {/* ── 2. Revenue charts ───────────────────────────────── */}
      <div className={styles.grid2}>
        <div className={styles.chartCard}>
          <div className={styles.chartCardHeader}>
            <span className={styles.chartCardTitle}>MRR Trend</span>
            <span className={styles.chartCardSub}>$31,200 / mo</span>
          </div>
          <div className={styles.chartWrap}>
            <LineChart
              data={mrrHistory as Array<Record<string, unknown>>}
              xDataKey="month"
              series={[{ dataKey: 'mrr', name: 'MRR', color: 'var(--color-accent)' }]}
              yTickFormatter={(v) => `$${Math.round(Number(v) / 1000)}k`}
            />
          </div>
        </div>
        <div className={styles.chartCard}>
          <div className={styles.chartCardHeader}>
            <span className={styles.chartCardTitle}>Daily Revenue</span>
            <span className={styles.chartCardSub}>$8,420 this month</span>
          </div>
          <div className={styles.chartWrap}>
            <AxisBarChart
              data={dailyRevenue as Array<Record<string, unknown>>}
              xDataKey="date"
              series={[{ dataKey: 'amount', name: 'Revenue', color: 'var(--color-success-text)' }]}
              leftAxis={{ tickFormatter: (v) => `$${Math.round(Number(v) / 100)}` }}
            />
          </div>
        </div>
      </div>

      {/* ── 3. Plan cards ───────────────────────────────────── */}
      <div className={styles.planGrid}>
        <PlanCard label="Free"       count={2_840} chart={freeChart}       color="var(--color-border)" />
        <PlanCard label="Standard"   count={1_156} chart={standardChart}   color="var(--color-accent)" />
        <PlanCard label="Enterprise" count={222}   chart={enterpriseChart} color="var(--color-warning, #f59e0b)" />
      </div>

      {/* ── 4. Growth + Provider distribution ──────────────── */}
      <div className={styles.grid2}>
        <div className={styles.chartCard}>
          <div className={styles.chartCardHeader}>
            <span className={styles.chartCardTitle}>Growth</span>
            <div className={styles.rangeFilter}>
              {(['24h', '7d', '30d'] as GrowthRange[]).map((r) => (
                <button
                  key={r}
                  className={`${styles.rangeBtn} ${range === r ? styles.rangeBtnActive : ''}`}
                  onClick={() => setRange(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.chartWrap}>
            <LineChart
              data={growthData[range] as Array<Record<string, unknown>>}
              xDataKey="date"
              series={[
                { dataKey: 'newUsers',    name: 'New Users',    color: 'var(--color-accent)' },
                { dataKey: 'newAccounts', name: 'New Accounts', color: 'var(--color-success-text)' },
              ]}
            />
          </div>
        </div>
        <div className={styles.chartCard}>
          <div className={styles.chartCardHeader}>
            <span className={styles.chartCardTitle}>Logins by Provider</span>
            <span className={styles.chartCardSub}>last 30 days</span>
          </div>
          <div className={styles.chartWrap}>
            <AxisBarChart
              data={providerDistribution as Array<Record<string, unknown>>}
              xDataKey="provider"
              series={[{ dataKey: 'loginCount', name: 'Logins', color: 'var(--color-accent)' }]}
            />
          </div>
        </div>
      </div>

      {/* ── 5. Unreviewed messages ──────────────────────────── */}
      <div className={styles.widgetCard}>
        <div className={styles.widgetHeader}>
          <span className={styles.widgetTitle}>Unreviewed Messages</span>
          <a href="/contact" className={styles.viewAll}>View all</a>
        </div>
        <div className={styles.simpleTable}>
          <div className={`${styles.tableRowContacts} ${styles.tableHead}`}>
            <span>Name</span>
            <span>Email</span>
            <span>Source</span>
            <span>Message</span>
            <span>Time</span>
          </div>
          {contacts.map((msg) => (
            <div key={msg.id} className={styles.tableRowContacts}>
              <span>{msg.name}</span>
              <span className={styles.muted}>{msg.email}</span>
              <span><SourceBadge source={msg.source} /></span>
              <span className={styles.truncate}>{msg.preview}</span>
              <span className={styles.muted}>{formatRelativeTime(msg.createdAt)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. Recent payments ──────────────────────────────── */}
      <div className={styles.widgetCard}>
        <div className={styles.widgetHeader}>
          <span className={styles.widgetTitle}>Recent Payments</span>
          <a href="/billing/invoices" className={styles.viewAll}>View all</a>
        </div>
        <div className={styles.simpleTable}>
          <div className={`${styles.tableRowBilling} ${styles.tableHead}`}>
            <span>Account</span>
            <span>Plan</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Time</span>
          </div>
          {billingRows.map((inv) => (
            <div key={inv.id} className={styles.tableRowBilling}>
              <span>{inv.accountName}</span>
              <span className={styles.capitalize}>{inv.plan}</span>
              <span>{formatCents(inv.amount)}</span>
              <span><StatusBadge status={inv.status} /></span>
              <span className={styles.muted}>{formatRelativeTime(inv.createdAt)}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

type StatCardProps = {
  label: string;
  total: number;
  newThisMonth: number;
  newLabel?: string;
  chart: { date: string; count: number }[];
  color: string;
};

function StatCard({ label, total, newThisMonth, newLabel = 'this month', chart, color }: StatCardProps) {
  const pct = growthPercent(chart);
  return (
    <div className={styles.statCard}>
      <div className={styles.statCardTop}>
        <span className={styles.statLabel}>{label}</span>
        {pct !== null && (
          <span className={`${styles.badge} ${pct >= 0 ? styles.badgeUp : styles.badgeDown}`}>
            {pct >= 0 ? '+' : ''}{pct}%
          </span>
        )}
      </div>
      <span className={styles.statValue}>{total.toLocaleString()}</span>
      <span className={styles.statSub}>+{newThisMonth} {newLabel}</span>
      <div className={styles.sparkline}>
        <SparklineAreaChart
          data={chart as Array<Record<string, unknown>>}
          xDataKey="date"
          yDataKey="count"
          color={color}
          showTooltip={false}
        />
      </div>
    </div>
  );
}

type PlanCardProps = {
  label: string;
  count: number;
  chart: { date: string; count: number }[];
  color: string;
};

function PlanCard({ label, count, chart, color }: PlanCardProps) {
  return (
    <div className={styles.planCard} style={{ borderTopColor: color }}>
      <span className={styles.planLabel}>{label}</span>
      <span className={styles.planCount}>{count.toLocaleString()}</span>
      <span className={styles.planSub}>active accounts</span>
      <div className={styles.sparkline}>
        <SparklineAreaChart
          data={chart as Array<Record<string, unknown>>}
          xDataKey="date"
          yDataKey="count"
          color={color}
          showTooltip={false}
        />
      </div>
    </div>
  );
}

function SourceBadge({ source }: { source: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    dash_error:    { label: 'Error',    cls: styles.badgeError },
    dash_feature:  { label: 'Feature',  cls: styles.badgeFeature },
    dash_feedback: { label: 'Feedback', cls: styles.badgeFeedback },
    public_form:   { label: 'Public',   cls: styles.badgePublic },
    system_alert:  { label: 'Alert',    cls: styles.badgeError },
  };
  const entry = map[source] ?? { label: source, cls: styles.badgePublic };
  return <span className={`${styles.badge} ${entry.cls}`}>{entry.label}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid:           styles.badgeUp,
    refunded:       styles.badgeOrange,
    partial_refund: styles.badgeOrange,
    failed:         styles.badgeDown,
    pending:        styles.badgeNeutral,
  };
  return (
    <span className={`${styles.badge} ${map[status] ?? styles.badgeNeutral}`}>
      {status.replace('_', ' ')}
    </span>
  );
}
