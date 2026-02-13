import { routesById } from '@/utils';
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