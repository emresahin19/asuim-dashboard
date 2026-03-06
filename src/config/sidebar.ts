import { SidebarItem, SidebarNavNode } from '@/types'
import { toSidebarItem } from '@/utils';

import ActivityIcon from '@/components/ui/icon/icons/Activity'
import ChartBarIcon from '@/components/ui/icon/icons/ChartBar'
import LayoutDashboardIcon from '@/components/ui/icon/icons/LayoutDashboard'
import TextCursorInputIcon from '@/components/ui/icon/icons/TextCursorInput'
import FilePenIcon from '@/components/ui/icon/icons/FilePen'
import MousePointerClickIcon from '@/components/ui/icon/icons/MousePointerClick'
import BoxIcon from '@/components/ui/icon/icons/Box'
import NavigationIcon from '@/components/ui/icon/icons/Navigation'
import BadgeCheckIcon from '@/components/ui/icon/icons/BadgeCheck'
import PaletteIcon from '@/components/ui/icon/icons/Palette'
import MoonIcon from '@/components/ui/icon/icons/Moon'
import LayersIcon from '@/components/ui/icon/icons/Layers'
import TypeIcon from '@/components/ui/icon/icons/Type'
import TextAlignCenterIcon from '@/components/ui/icon/icons/TextAlignCenter'
import WrenchIcon from '@/components/ui/icon/icons/Wrench'
import DropletIcon from '@/components/ui/icon/icons/Droplet'
import SmileIcon from '@/components/ui/icon/icons/Smile'
import ZapIcon from '@/components/ui/icon/icons/Zap'
import CpuIcon from '@/components/ui/icon/icons/Cpu'
import AccessibilityIcon from '@/components/ui/icon/icons/Accessibility'
import CircleDotIcon from '@/components/ui/icon/icons/CircleDot'
import AlignVerticalSpaceAroundIcon from '@/components/ui/icon/icons/AlignVerticalSpaceAround'
import CheckCheckIcon from '@/components/ui/icon/icons/CheckCheck'
import SlidersHorizontal from '@/components/ui/icon/icons/SlidersHorizontal'
import CalendarIcon from '@/components/ui/icon/icons/Calendar'
import TableIcon from '@/components/ui/icon/icons/Table'
import BellIcon from '@/components/ui/icon/icons/Bell'
import AppWindowIcon from '@/components/ui/icon/icons/AppWindow'
import MessageCircleIcon from '@/components/ui/icon/icons/MessageCircle'

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
      { id: 'table', label: 'Table', role: 'item', icon: TableIcon, routeId: 'table' },
      { id: 'components-toaster', label: 'Toaster', role: 'item', icon: BellIcon, routeId: 'components-toaster' },
      { id: 'components-modal', label: 'Modal', role: 'item', icon: AppWindowIcon, routeId: 'components-modal' },
      { id: 'components-tooltip', label: 'Tooltip', role: 'item', icon: MessageCircleIcon, routeId: 'components-tooltip' },
      {
        id: 'components-form', label: 'Form', role: 'item', icon: FilePenIcon, children: [
          { id: 'components-form-input', label: 'Input', role: 'item', icon: TextCursorInputIcon, routeId: 'components-form-input' },
          { id: 'components-form-checkbox', label: 'Checkbox', role: 'item', icon: BadgeCheckIcon, routeId: 'components-form-checkbox' },
          { id: 'components-form-select', label: 'Select', role: 'item', icon: AlignVerticalSpaceAroundIcon, routeId: 'components-form-select' },
          { id: 'components-form-radio', label: 'Radio', role: 'item', icon: CircleDotIcon, routeId: 'components-form-radio' },
          { id: 'components-form-switch', label: 'Switch', role: 'item', icon: CheckCheckIcon, routeId: 'components-form-switch' },
          { id: 'components-form-range', label: 'Range', role: 'item', icon: SlidersHorizontal, routeId: 'components-form-range' },
          { id: 'components-form-date-picker', label: 'Date Picker', role: 'item', icon: CalendarIcon, routeId: 'components-form-date-picker' },
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
