import { routesById } from '@/constant/route-registry.config';
import ButtonsPage from '@/views/components/buttons/Buttons.page';
import { Metadata } from 'next';

const route = routesById['buttons'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <ButtonsPage />;
}