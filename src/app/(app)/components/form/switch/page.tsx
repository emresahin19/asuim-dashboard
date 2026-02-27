import { routesById } from '@/utils';
import SwitchPage from '@/views/components/form/switch/Switch.page';
import { Metadata } from 'next';

const route = routesById['components-form-switch'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <SwitchPage />;
}