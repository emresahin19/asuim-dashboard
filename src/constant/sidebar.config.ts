// src/constant/sidebar.config.ts

import { routesById } from './route-registry.config';
import { SidebarItem, SidebarItemRole } from '../layouts/sidebar/sidebar.types';
import { IconName } from '@/components/ui/icon/icon.types';

type SidebarNavNode = {
  id: string;
  label: string;
  role: SidebarItemRole;
  icon?: IconName;
  href?: string;
  routeId?: string;
  children?: SidebarNavNode[];
};

function resolveHref(node: SidebarNavNode): string | undefined {
  if (node.href) return node.href;

  if (node.routeId) {
    const route = routesById[node.routeId];

    if (!route) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `[sidebar] routeId "${node.routeId}" not found in routeRegistry (node id: "${node.id}")`
        );
      }
      return undefined;
    }

    return route.path;
  }

  return undefined;
}


function toSidebarItem(node: SidebarNavNode): SidebarItem {
  const href = resolveHref(node);

  return {
    id: node.id,
    label: node.label,
    role: node.role,
    icon: node.icon,
    href,
    children: node.children?.map(toSidebarItem),
  };
}

const navTree: SidebarNavNode[] = [
  { id: 'overview', label: 'Overview', role: 'section' },

  {
    id: 'dashboard',
    label: 'Dashboard',
    role: 'item',
    icon: 'chart-bar',
    routeId: 'dashboard',
  },
  {
    id: 'status',
    label: 'System Status',
    role: 'item',
    icon: 'activity',
    routeId: 'status',
  },

  { id: 'ui', label: 'UI', role: 'section' },

  {
    id: 'foundations',
    label: 'Foundations',
    role: 'group',
    icon: 'layers',
    children: [
      { id: 'tokens', label: 'Design Tokens', role: 'item', icon: 'palette', routeId: 'tokens' },
      { id: 'themes', label: 'Themes', role: 'item', icon: 'moon', routeId: 'themes' },
      { id: 'layout', label: 'Grid & Layout', role: 'item', icon: 'layout-dashboard', routeId: 'layout' },
    ],
  },

  {
    id: 'typography',
    label: 'Typography',
    role: 'group',
    icon: 'type',
    children: [
      { id: 'type-system', label: 'Type System', role: 'item', icon: 'text-align-center', routeId: 'type-system' },
    ],
  },

  {
    id: 'components',
    label: 'Components',
    role: 'group',
    icon: 'box',
    children: [
      { id: 'buttons', label: 'Buttons', role: 'item', icon: 'mouse-pointer-click', routeId: 'buttons' },
      {
        id: 'components-form', label: 'Form', role: 'item', icon: 'file-pen', routeId: 'components-form', children: [
          { id: 'components-form-input', label: 'Input', role: 'item', icon: 'text-cursor-input', routeId: 'components-form-input' },
          { id: 'components-form-checkbox', label: 'Checkbox', role: 'item', icon: 'badge-check', routeId: 'components-form-checkbox' },
        ]
      },
      { id: 'navigation', label: 'Navigation', role: 'item', icon: 'navigation', routeId: 'navigation' },
    ],
  },

  {
    id: 'utilities',
    label: 'Utilities',
    role: 'group',
    icon: 'wrench',
    children: [
      { id: 'icons', label: 'Icons', role: 'item', icon: 'smile', routeId: 'icons' },
      { id: 'colors', label: 'Colors', role: 'item', icon: 'droplet', routeId: 'colors' },
    ],
  },

  { id: 'system', label: 'System', role: 'section' },

  {
    id: 'system-pages',
    label: 'System',
    role: 'group',
    icon: 'cpu',
    children: [
      { id: 'accessibility', label: 'Accessibility', role: 'item', icon: 'accessibility', routeId: 'accessibility' },
      { id: 'performance', label: 'Performance', role: 'item', icon: 'zap', routeId: 'performance' },
    ],
  },
];

export const sidebarConfig: SidebarItem[] = navTree.map(toSidebarItem);
