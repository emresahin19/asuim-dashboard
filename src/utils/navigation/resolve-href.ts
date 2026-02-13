import { SidebarNavNode } from "@/types";
import { routesById } from "./routes-by-id";

export function resolveHref(node: SidebarNavNode): string | undefined {
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
