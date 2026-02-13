import { SidebarItem, SidebarNavNode } from "@/types";
import { resolveHref } from "./resolve-href";

export function toSidebarItem(node: SidebarNavNode): SidebarItem {
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
