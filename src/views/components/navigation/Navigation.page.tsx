"use client";

import { useState } from 'react';
import { BreadCrumbs } from '@/components/layout/bread-crumbs';
import { Card } from '@/components/ui/card';
import { TabsControlled } from '@/components/ui/tabs';
import type { ControlledTab } from '@/components/ui/tabs';
import type { SpinnerName } from '@/components/ui/spinner/spinner.types';
import styles from './navigation.module.scss';

// ─── Demo data ───────────────────────────────────────────────────────────────

const overviewTabs: ControlledTab[] = [
  { id: 'overview',  label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings',  label: 'Settings' },
];

const billingTabs: ControlledTab[] = [
  { id: 'invoices',      label: 'Invoices' },
  { id: 'subscriptions', label: 'Subscriptions' },
  { id: 'cancellations', label: 'Cancellations' },
  { id: 'overview',      label: 'Overview' },
];

const userTabs: ControlledTab[] = [
  { id: 'profile',  label: 'Profile' },
  { id: 'sessions', label: 'Sessions' },
  { id: 'history',  label: 'Merge History' },
  { id: 'audit',    label: 'Audit Logs' },
];

const spinnerOptions: SpinnerName[] = [
  'dots', 'dots2', 'dots4', 'circle', 'arc',
  'line', 'bounce', 'triangle', 'flip', 'star',
];

const staticBreadcrumbs = [
  { label: 'Overview', items: [{ title: 'Dashboard', path: '/dashboard' }] },
  {
    label: 'Nested',
    items: [
      { title: 'Components', path: '/components' },
      { title: 'Navigation', path: '/components/navigation' },
    ],
  },
  {
    label: 'Deep',
    items: [
      { title: 'Components', path: '/components' },
      { title: 'Form', path: '/components/form' },
      { title: 'Input', path: '/components/form/input' },
    ],
  },
];

// ─── Tab panel content ────────────────────────────────────────────────────────

const PANEL_CONTENT: Record<string, React.ReactNode> = {
  overview: (
    <div className={styles.tabPanel}>
      <p className={styles.panelTitle}>Platform Overview</p>
      <p className={styles.panelText}>
        Real-time summary of your platform activity. Monitor growth trends, active sessions and
        revenue at a glance.
      </p>
      <div className={styles.panelStats}>
        {[['4,218', 'Accounts'], ['38.4k', 'Users'], ['1,923', 'Sessions'], ['$31.2k', 'MRR']].map(([v, l]) => (
          <div key={l} className={styles.statPill}>
            <span>{v}</span>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  analytics: (
    <div className={styles.tabPanel}>
      <p className={styles.panelTitle}>Analytics</p>
      <p className={styles.panelText}>
        Breakdown of user acquisition, retention and engagement metrics over the selected period.
      </p>
      <ul className={styles.panelList}>
        <li className={styles.panelListItem}>New sign-ups this week: 312</li>
        <li className={styles.panelListItem}>D30 retention: 68%</li>
        <li className={styles.panelListItem}>Avg. sessions / user: 4.2</li>
        <li className={styles.panelListItem}>Top provider: Google (42%)</li>
      </ul>
    </div>
  ),
  settings: (
    <div className={styles.tabPanel}>
      <p className={styles.panelTitle}>Settings</p>
      <p className={styles.panelText}>
        Configure platform defaults, notification preferences and security policies.
      </p>
      <ul className={styles.panelList}>
        <li className={styles.panelListItem}>SSO enforced: Yes</li>
        <li className={styles.panelListItem}>MFA required: All users</li>
        <li className={styles.panelListItem}>Session timeout: 30 min</li>
        <li className={styles.panelListItem}>Audit retention: 90 days</li>
      </ul>
    </div>
  ),
  invoices: (
    <div className={styles.tabPanel}>
      <p className={styles.panelTitle}>Invoices</p>
      <p className={styles.panelText}>7 invoices generated this month. 5 paid, 1 pending, 1 failed.</p>
    </div>
  ),
  subscriptions: (
    <div className={styles.tabPanel}>
      <p className={styles.panelTitle}>Active Subscriptions</p>
      <div className={styles.panelStats}>
        {[['2,840', 'Free'], ['1,156', 'Standard'], ['222', 'Enterprise']].map(([v, l]) => (
          <div key={l} className={styles.statPill}><span>{v}</span><span>{l}</span></div>
        ))}
      </div>
    </div>
  ),
  cancellations: (
    <div className={styles.tabPanel}>
      <p className={styles.panelTitle}>Cancellations</p>
      <p className={styles.panelText}>14 cancellations this month. Churn rate: 0.9%.</p>
    </div>
  ),
  profile: (
    <div className={styles.tabPanel}>
      <p className={styles.panelTitle}>User Profile</p>
      <p className={styles.panelText}>Name, email, avatar, linked providers and account plan.</p>
    </div>
  ),
  sessions: (
    <div className={styles.tabPanel}>
      <p className={styles.panelTitle}>Active Sessions</p>
      <p className={styles.panelText}>3 active sessions across 2 devices.</p>
    </div>
  ),
  history: (
    <div className={styles.tabPanel}>
      <p className={styles.panelTitle}>Merge History</p>
      <p className={styles.panelText}>No account merges recorded for this user.</p>
    </div>
  ),
  audit: (
    <div className={styles.tabPanel}>
      <p className={styles.panelTitle}>Audit Logs</p>
      <p className={styles.panelText}>48 audit events in the last 30 days.</p>
    </div>
  ),
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function NavigationPage() {
  const [overviewActive, setOverviewActive] = useState('overview');
  const [billingActive, setBillingActive]   = useState('invoices');
  const [userActive, setUserActive]         = useState('profile');
  const [spinnerName, setSpinnerName]       = useState<SpinnerName>('dots');
  const [loadingDelay, setLoadingDelay]     = useState(600);

  return (
    <div className={styles.page}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <Card className={styles.heroCard} variant="gradient">
        <p className={styles.overline}>Components</p>
        <h1 className={styles.title}>Navigation</h1>
        <p className={styles.subtitle}>
          Tabs, Breadcrumbs ve NavigationProgress bileşenlerinin tüm kullanım biçimlerini
          interaktif olarak görebilirsin. Tab geçişlerinde loading overlay'ini özelleştirebilirsin.
        </p>
      </Card>

      {/* ── TabsControlled — controls ─────────────────────── */}
      <Card className={styles.heroCard}>
        <div className={styles.sectionHead}>
          <h2>Tabs (Controlled)</h2>
          <p>
            Route bağımsız, local state ile çalışır. Tab geçişinde içerik alanında spinner
            overlay gösterir.
          </p>
        </div>

        <div className={styles.tabsControls}>
          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Spinner</span>
            <select
              className={styles.controlSelect}
              value={spinnerName}
              onChange={(e) => setSpinnerName(e.target.value as SpinnerName)}
            >
              {spinnerOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className={styles.controlRow}>
            <span className={styles.controlLabel}>Delay</span>
            <select
              className={styles.controlSelect}
              value={loadingDelay}
              onChange={(e) => setLoadingDelay(Number(e.target.value))}
            >
              <option value={300}>300ms</option>
              <option value={600}>600ms</option>
              <option value={1000}>1s</option>
              <option value={2000}>2s</option>
              <option value={0}>none</option>
            </select>
          </div>
          <div className={styles.badgeRow}>
            {(['overview','analytics','settings'] as const).map((id) => (
              <button
                key={id}
                className={`${styles.badge} ${overviewActive === id ? styles.badgeAccent : ''}`}
                onClick={() => setOverviewActive(id)}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.demo}>
          <TabsControlled
            tabs={overviewTabs}
            activeId={overviewActive}
            onTabChange={setOverviewActive}
            spinnerName={spinnerName}
            loadingDelay={loadingDelay}
          >
            {PANEL_CONTENT[overviewActive]}
          </TabsControlled>
        </div>
      </Card>

      {/* ── Billing tabs ─────────────────────────────────── */}
      <Card className={styles.heroCard}>
        <div className={styles.sectionHead}>
          <h2>Tabs — 4 sekme</h2>
          <p>Billing sayfasındaki gibi daha fazla sekme örneği.</p>
        </div>
        <div className={styles.demo}>
          <TabsControlled
            tabs={billingTabs}
            activeId={billingActive}
            onTabChange={setBillingActive}
            spinnerName={spinnerName}
            loadingDelay={loadingDelay}
          >
            {PANEL_CONTENT[billingActive]}
          </TabsControlled>
        </div>
      </Card>

      {/* ── User tabs ─────────────────────────────────────── */}
      <Card className={styles.heroCard}>
        <div className={styles.sectionHead}>
          <h2>Tabs — uzun etiketler</h2>
          <p>Kullanıcı detay sayfasındaki gibi daha uzun etiket örnekleri.</p>
        </div>
        <div className={styles.demo}>
          <TabsControlled
            tabs={userTabs}
            activeId={userActive}
            onTabChange={setUserActive}
            spinnerName={spinnerName}
            loadingDelay={loadingDelay}
          >
            {PANEL_CONTENT[userActive]}
          </TabsControlled>
        </div>
      </Card>

      {/* ── Breadcrumbs ──────────────────────────────────── */}
      <Card className={styles.heroCard}>
        <div className={styles.sectionHead}>
          <h2>Breadcrumbs</h2>
          <p>Mevcut route'a göre otomatik oluşturulur. 2+ segment olduğunda görünür.</p>
        </div>

        <div className={styles.bcDemoWrap}>
          {/* Live breadcrumbs from current route */}
          <div className={styles.bcRow}>
            <span className={styles.bcLabel}>Current page (live)</span>
            <div className={styles.bcPreview}>
              <BreadCrumbs />
            </div>
          </div>

          {/* Static examples rendered with inline markup */}
          {staticBreadcrumbs.map(({ label, items }) => (
            <div key={label} className={styles.bcRow}>
              <span className={styles.bcLabel}>{label}</span>
              <div className={styles.bcPreview}>
                <StaticBreadcrumbs items={items} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── NavigationProgress ───────────────────────────── */}
      <Card className={styles.heroCard}>
        <div className={styles.sectionHead}>
          <h2>NavigationProgress</h2>
          <p>Sidebar veya herhangi bir link'e tıklandığında otomatik devreye girer.</p>
        </div>

        <div className={styles.progressInfo}>
          <p>
            <strong>Nasıl çalışır?</strong> Document-level click listener ile tüm internal
            link tıklamalarını yakalar. Hedef path'e göre <code>fullscreen</code> veya{' '}
            <code>app-content</code> overlay seçer. Pathname değiştiğinde overlay kalkar.
          </p>
          <p>
            Her navigasyonda rastgele bir spinner seçilir. Mevcut spinner varyant sayısı:{' '}
            <strong>62</strong>.
          </p>
        </div>

        <pre className={styles.progressCode}>{`// RootLayout içinde bir kere mount edilir
<NavigationProgress />

// Otomatik olarak şu durumları yakalar:
// /auth/*        → fullscreen overlay
// /onboarding/*  → fullscreen overlay
// diğer          → app-content overlay (blur + spinner)`}</pre>

        <div className={styles.badgeRow} style={{ marginTop: 12 }}>
          {['fullscreen', 'app-content', 'auto-random spinner', 'pathname-aware', '10s timeout'].map((t) => (
            <span key={t} className={styles.badge}>{t}</span>
          ))}
        </div>
      </Card>

    </div>
  );
}

// ─── Static breadcrumb preview ────────────────────────────────────────────────

function StaticBreadcrumbs({ items }: { items: { title: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--color-text-muted)', listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {isLast ? (
                <span aria-current="page">{item.title}</span>
              ) : (
                <a href={item.path} style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
                  {item.title}
                </a>
              )}
              {!isLast && <span style={{ opacity: 0.4 }}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
