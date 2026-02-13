import { routesById } from '@/config';
import PerformancePage from '@/views/system/performance/Performance.page';
import { Metadata } from 'next';

const route = routesById['performance'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <PerformancePage />;
}