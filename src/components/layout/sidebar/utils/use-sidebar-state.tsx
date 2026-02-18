import { useTheme } from "@/context";
import { SidebarState } from "@/types";
import { Dispatch, SetStateAction, useCallback } from "react";

type UseSidebarStateArgs = {
  setOpenGroups: Dispatch<SetStateAction<Set<string>>>;
};

export function useSidebarState({ setOpenGroups }: UseSidebarStateArgs) {
  const { sidebarState, setSidebarState } = useTheme();

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
  }, [setOpenGroups]);

  return {
    sidebarState,
    toggleSidebar,
    setSidebarState,
    toggleGroup
  };
}
