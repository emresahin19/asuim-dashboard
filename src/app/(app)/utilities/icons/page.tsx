import { routesById } from '@/constant/route-registry.config';
import IconsPage from '@/views/utilities/icons/Icons.page';
import { Metadata } from 'next';

const route = routesById['icons'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <IconsPage />;
}