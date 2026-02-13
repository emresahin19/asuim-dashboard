import { useTheme } from "@/context";
import { SidebarState } from "@/types";
import { useCallback, useState } from "react";

export function useSidebarState() {
  const { sidebarState, setSidebarState } = useTheme();
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  const toggleSidebar = useCallback(() => {
    const cycle: Record<SidebarState, SidebarState> = {
      open: 'icon',
      icon: 'closed',
      closed: 'open'
    };

    setSidebarState(cycle[sidebarState]);
  }, [sidebarState, setSidebarState]);

  const toggleGroup = useCallback((id: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  return {
    sidebarState,
    toggleSidebar,
    setSidebarState,
    openGroups,
    setOpenGroups,
    toggleGroup
  };
}
