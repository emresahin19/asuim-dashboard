import { routesById } from '@/config';
import ComponentsPage from '@/views/components/page/Components.page';
import { Metadata } from 'next';

const route = routesById['components'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <ComponentsPage />;
}