import { SidebarItem } from '../layouts/sidebar/sidebar.types';

export const sidebarConfig: SidebarItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    role: 'section',
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

  {
    id: 'ui',
    label: 'UI',
    role: 'section',
  },
  {
    id: 'foundations',
    label: 'Foundations',
    icon: 'layers',
    children: [
      {
        id: 'tokens',
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
        id: 'layout',
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
    ],
  },

  {
    id: 'components',
    label: 'Components',
    icon: 'box',
    children: [
      {
        id: 'buttons',
        label: 'Buttons',
        href: '/components/buttons',
        icon: 'mouse-pointer-click',
      },
      {
        id: 'inputs',
        label: 'Inputs',
        href: '/components/inputs',
        icon: 'file-pen',
      },
      {
        id: 'navigation',
        label: 'Navigation',
        href: '/components/navigation',
        icon: 'navigation',
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
        label: 'Icons',
        href: '/utilities/icons',
        icon: 'grid-3x3',
      },
      {
        id: 'colors',
        label: 'Colors',
        href: '/utilities/colors',
        icon: 'droplet',
      },
    ],
  },

  {
    id: 'system',
    label: 'System',
    role: 'section',
  },
  {
    id: 'system-pages',
    label: 'System',
    icon: 'cpu',
    children: [
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
];
