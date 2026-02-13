import { IconName } from "./icon.types";

export type SidebarState = 'open' | 'icon' | 'closed';

export type SidebarItemRole = 'section' | 'group' | 'item';

export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: IconName;
  role?: SidebarItemRole;
  children?: SidebarItem[];
}

export type SidebarNavNode = {
  id: string;
  label: string;
  role: SidebarItemRole;
  icon?: IconName;
  href?: string;
  routeId?: string;
  children?: SidebarNavNode[];
};
