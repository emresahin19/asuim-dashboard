import { routesById } from '@/constant/route-registry.config';
import ColorsPage from '@/views/utilities/colors/Colors.page';
import { Metadata } from 'next';

const route = routesById['colors'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <ColorsPage />;
}