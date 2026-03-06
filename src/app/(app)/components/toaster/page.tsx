import { routesById } from '@/utils';
import ToasterPage from '@/views/components/toaster/Toaster.page';
import { Metadata } from 'next';

const route = routesById['components-toaster'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <ToasterPage />;
}
