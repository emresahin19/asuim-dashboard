import { routesById } from '@/constant/route-registry.config';
import LayoutPage from '@/views/foundations/layout/Layout.page';
import { Metadata } from 'next';

const route = routesById['layout'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <LayoutPage />;
}