import { routesById } from '@/utils';
import ChartPage from '@/views/components/chart/Chart.page';
import { Metadata } from 'next';

const route = routesById['components-chart'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <ChartPage />;
}
