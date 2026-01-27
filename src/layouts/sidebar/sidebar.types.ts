import { IconName } from "@/components/ui/icon/icon.types";

export type SidebarItemRole = 'section' | 'group' | 'item';

export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: IconName;
  role?: SidebarItemRole;
  children?: SidebarItem[];
}