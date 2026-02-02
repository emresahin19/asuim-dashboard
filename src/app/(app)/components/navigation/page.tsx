import { routesById } from '@/constant/route-registry.config';
import NavigationPage from '@/views/components/navigation/Navigation.page';
import { Metadata } from 'next';

const route = routesById['navigation'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <NavigationPage />;
}