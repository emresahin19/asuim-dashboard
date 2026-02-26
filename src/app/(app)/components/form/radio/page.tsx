import { routesById } from '@/utils';
import RadioPage from '@/views/components/form/radio/Radio.page';
import { Metadata } from 'next';

const route = routesById['components-form-radio'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <RadioPage />;
}