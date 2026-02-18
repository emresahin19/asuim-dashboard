import { useTheme } from "@/context";
import { SidebarState } from "@/types";
import { useCallback } from "react";

export function useSidebarState() {
  const { sidebarState, setSidebarState, openGroups, setOpenGroups } = useTheme();

  const toggleSidebar = useCallback(() => {
    const cycle: Record<SidebarState, SidebarState> = {
      open: 'icon',
      icon: 'closed',
      closed: 'open'
    };

    setSidebarState(cycle[sidebarState]);
  }, [sidebarState, setSidebarState]);

  const toggleGroup = useCallback((id: string) => {
    const next = new Set(openGroups);
    next.has(id) ? next.delete(id) : next.add(id);
    setOpenGroups(next);
  }, [openGroups, setOpenGroups]);

  return {
    sidebarState,
    toggleSidebar,
    setSidebarState,
    openGroups,
    setOpenGroups,
    toggleGroup
  };
}
