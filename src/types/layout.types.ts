export type SidebarState = 'open' | 'icon' | 'closed';

export type SidebarItemRole = 'section' | 'group' | 'item';

export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  role?: SidebarItemRole;
  children?: SidebarItem[];
}

export type SidebarNavNode = {
  id: string;
  label: string;
  role: SidebarItemRole;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  href?: string;
  routeId?: string;
  children?: SidebarNavNode[];
};
