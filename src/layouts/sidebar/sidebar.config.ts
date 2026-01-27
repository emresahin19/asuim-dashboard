// src/layouts/sidebar/sidebar.config.ts
import { SidebarItem } from './sidebar.types';

export const sidebarConfig: SidebarItem[] = [
  {
    id: 'overview-section',
    label: 'Overview',
    role: 'section',
  },
  {
    id: 'overview',
    label: 'Overview',
    icon: 'layout-dashboard',
    children: [
      {
        id: 'welcome',
        label: 'Welcome',
        href: '/',
        icon: 'house',
      },
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: 'chart-bar',
      },
      {
        id: 'status',
        label: 'System Status',
        href: '/status',
        icon: 'activity',
      },
    ],
  },

  {
    id: 'ui-section',
    label: 'UI',
    role: 'section',
  },
  {
    id: 'foundations',
    label: 'Foundations',
    icon: 'layers',
    children: [
      {
        id: 'design-tokens',
        label: 'Design Tokens',
        href: '/foundations/tokens',
        icon: 'palette',
      },
      {
        id: 'themes',
        label: 'Themes',
        href: '/foundations/themes',
        icon: 'moon',
      },
      {
        id: 'grid-layout',
        label: 'Grid & Layout',
        href: '/foundations/layout',
        icon: 'layout-dashboard',
      },
    ],
  },

  {
    id: 'typography',
    label: 'Typography',
    icon: 'type',
    children: [
      {
        id: 'type-system',
        label: 'Type System',
        href: '/typography/system',
        icon: 'text-align-center',
      },
      {
        id: 'content',
        label: 'Content',
        href: '/typography/content',
        icon: 'text-align-start',
      },
      {
        id: 'font-playground',
        label: 'Font Playground',
        href: '/typography/fonts',
        icon: 'case-sensitive',
      },
    ],
  },

  {
    id: 'components',
    label: 'Components',
    icon: 'box',
    children: [
      {
        id: 'inputs',
        label: 'Inputs',
        href: '/components/inputs',
        icon: 'file-pen',
      },
      {
        id: 'buttons',
        label: 'Buttons',
        href: '/components/buttons',
        icon: 'mouse-pointer-click',
      },
      {
        id: 'navigation',
        label: 'Navigation',
        href: '/components/navigation',
        icon: 'navigation',
      },
      {
        id: 'feedback',
        label: 'Feedback',
        href: '/components/feedback',
        icon: 'bell',
      },
      {
        id: 'overlays',
        label: 'Overlays',
        href: '/components/overlays',
        icon: 'layers-2',
      },
      {
        id: 'data-display',
        label: 'Data Display',
        href: '/components/data-display',
        icon: 'table',
      },
      {
        id: 'tables',
        label: 'Tables',
        href: '/components/tables',
        icon: 'layout-grid',
      },
      {
        id: 'media',
        label: 'Media',
        href: '/components/media',
        icon: 'image',
      },
    ],
  },

  {
    id: 'patterns',
    label: 'Patterns',
    icon: 'workflow',
    children: [
      {
        id: 'forms',
        label: 'Forms',
        href: '/patterns/forms',
        icon: 'clipboard-list',
      },
      {
        id: 'crud',
        label: 'CRUD Screens',
        href: '/patterns/crud',
        icon: 'database',
      },
      {
        id: 'search-filter',
        label: 'Search & Filter',
        href: '/patterns/search',
        icon: 'search',
      },
      {
        id: 'errors',
        label: 'Error Handling',
        href: '/patterns/errors',
        icon: 'circle-alert',
      },
    ],
  },

  {
    id: 'widgets',
    label: 'Widgets',
    icon: 'sliders-horizontal',
    children: [
      {
        id: 'cards',
        label: 'Cards',
        href: '/widgets/cards',
        icon: 'credit-card',
      },
      {
        id: 'charts',
        label: 'Charts',
        href: '/widgets/charts',
        icon: 'chart-pie',
      },
      {
        id: 'activity',
        label: 'Activity',
        href: '/widgets/activity',
        icon: 'clock',
      },
    ],
  },

  {
    id: 'utilities',
    label: 'Utilities',
    icon: 'wrench',
    children: [
      {
        id: 'icons',
        label: 'Icons Catalog',
        href: '/utilities/icons',
        icon: 'grid-3x3',
      },
      {
        id: 'colors',
        label: 'Colors',
        href: '/utilities/colors',
        icon: 'droplet',
      },
      {
        id: 'spacing',
        label: 'Spacing',
        href: '/utilities/spacing',
        icon: 'move',
      },
      {
        id: 'shadows',
        label: 'Shadows & Radius',
        href: '/utilities/shadows',
        icon: 'square',
      },
    ],
  },

  {
    id: 'system-section',
    label: 'System',
    role: 'section',
  },

  {
    id: 'system',
    label: 'System',
    icon: 'cpu',
    children: [
      {
        id: 'state',
        label: 'State Management',
        href: '/system/state',
        icon: 'layers-2',
      },
      {
        id: 'hooks',
        label: 'Hooks',
        href: '/system/hooks',
        icon: 'fishing-hook',
      },
      {
        id: 'accessibility',
        label: 'Accessibility',
        href: '/system/accessibility',
        icon: 'accessibility',
      },
      {
        id: 'performance',
        label: 'Performance',
        href: '/system/performance',
        icon: 'zap',
      },
    ],
  },

  {
    id: 'auth',
    label: 'Auth (Template)',
    icon: 'lock',
    children: [
      {
        id: 'login',
        label: 'Login',
        href: '/auth/login',
        icon: 'log-in',
      },
      {
        id: 'register',
        label: 'Register',
        href: '/auth/register',
        icon: 'user-plus',
      },
      {
        id: 'forgot',
        label: 'Forgot Password',
        href: '/auth/forgot-password',
        icon: 'hand-helping',
      },
    ],
  },
];
