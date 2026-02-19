import { SidebarItem, SidebarNavNode } from '@/types'
import { toSidebarItem } from '@/utils';
import { 
  Activity as ActivityIcon, 
  ChartBar as ChartBarIcon, 
  LayoutDashboard as LayoutDashboardIcon, 
  TextCursorInput as TextCursorInputIcon, 
  FilePen as FilePenIcon, 
  MousePointerClick as MousePointerClickIcon, 
  Box as BoxIcon, 
  Navigation as NavigationIcon, 
  BadgeCheck as BadgeCheckIcon, 
  Palette as PaletteIcon, 
  Moon as MoonIcon, 
  Layers as LayersIcon, 
  Type as TypeIcon, 
  TextAlignCenter as TextAlignCenterIcon, 
  Wrench as WrenchIcon, 
  Droplet as DropletIcon, 
  Smile as SmileIcon, 
  Zap as ZapIcon, 
  Cpu as CpuIcon, 
  Accessibility as AccessibilityIcon 
} from '@/components/ui/icon/icons';

const navTree: SidebarNavNode[] = [
  { id: 'overview', label: 'Overview', role: 'section' },

  {
    id: 'dashboard',
    label: 'Dashboard',
    role: 'item',
    icon: ChartBarIcon,
    routeId: 'dashboard',
  },
  {
    id: 'status',
    label: 'System Status',
    role: 'item',
    icon: ActivityIcon,
    routeId: 'status',
  },

  { id: 'ui', label: 'UI', role: 'section' },

  {
    id: 'foundations',
    label: 'Foundations',
    role: 'group',
    icon: LayersIcon,
    children: [
      { id: 'tokens', label: 'Design Tokens', role: 'item', icon: PaletteIcon, routeId: 'tokens' },
      { id: 'themes', label: 'Themes', role: 'item', icon: MoonIcon, routeId: 'themes' },
      { id: 'layout', label: 'Grid & Layout', role: 'item', icon: LayoutDashboardIcon, routeId: 'layout' },
    ],
  },

  {
    id: 'typography',
    label: 'Typography',
    role: 'group',
    icon: TypeIcon,
    children: [
      { id: 'type-system', label: 'Type System', role: 'item', icon: TextAlignCenterIcon, routeId: 'type-system' },
    ],
  },

  {
    id: 'components',
    label: 'Components',
    role: 'group',
    icon: BoxIcon,
    children: [
      { id: 'buttons', label: 'Buttons', role: 'item', icon: MousePointerClickIcon, routeId: 'buttons' },
      {
        id: 'components-form', label: 'Form', role: 'item', icon: FilePenIcon, children: [
          { id: 'components-form-input', label: 'Input', role: 'item', icon: TextCursorInputIcon, routeId: 'components-form-input' },
          { id: 'components-form-checkbox', label: 'Checkbox', role: 'item', icon: BadgeCheckIcon, routeId: 'components-form-checkbox' },
        ]
      },
      { id: 'navigation', label: 'Navigation', role: 'item', icon: NavigationIcon, routeId: 'navigation' },
    ],
  },

  {
    id: 'utilities',
    label: 'Utilities',
    role: 'group',
    icon: WrenchIcon,
    children: [
      { id: 'icons', label: 'Icons', role: 'item', icon: SmileIcon, routeId: 'icons' },
      { id: 'colors', label: 'Colors', role: 'item', icon: DropletIcon, routeId: 'colors' },
    ],
  },

  { id: 'system', label: 'System', role: 'section' },

  {
    id: 'system-pages',
    label: 'System',
    role: 'group',
    icon: CpuIcon,
    children: [
      { id: 'accessibility', label: 'Accessibility', role: 'item', icon: AccessibilityIcon, routeId: 'accessibility' },
      { id: 'performance', label: 'Performance', role: 'item', icon: ZapIcon, routeId: 'performance' },
    ],
  },
];

export const sidebarConfig: SidebarItem[] = navTree.map(toSidebarItem);
