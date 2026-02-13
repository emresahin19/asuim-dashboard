import { routesById } from '@/utils';
import DashboardPage from '@/views/dashboard/Dashboard.page';
import { Metadata } from 'next';

const route = routesById['dashboard'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <DashboardPage />;
}