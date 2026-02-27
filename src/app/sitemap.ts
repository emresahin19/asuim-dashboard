import { MetadataRoute } from 'next';
import { routeRegistry } from '@/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = routeRegistry.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route.path === '/dashboard' ? 1 : 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...routes,
  ];
}
