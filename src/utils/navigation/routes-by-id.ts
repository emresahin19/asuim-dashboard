import { routeRegistry } from "@/config";
import { RouteDefinition } from "@/types";

export const routesById = Object.fromEntries(
    routeRegistry.map((r) => [r.id, r] as const)
) satisfies Record<string, RouteDefinition>;
