import { routeRegistry } from "@/config";

function normalize(path: string) {
  return path.replace(/\/+$/, '');
}

export function resolveRouteByPathname(pathname: string) {
  const clean = normalize(pathname);

  return routeRegistry.find(
    (route) => normalize(route.path) === clean
  );
}

export function resolveBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);

  let currentPath = '';
  const breadcrumbs: { title: string; path: string }[] = [];

  for (const segment of segments) {
    currentPath += `/${segment}`;

    const route = routeRegistry.find(
      (r) => normalize(r.path) === currentPath
    );

    if (route) {
      breadcrumbs.push({
        title: route.title,
        path: route.path,
      });
    }
  }

  return breadcrumbs;
}
