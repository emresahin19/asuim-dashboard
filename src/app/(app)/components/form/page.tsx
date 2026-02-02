import { routesById } from '@/constant/route-registry.config';
import FormPage from '@/views/components/form/page/Form.page';
import { Metadata } from 'next';

const route = routesById['components-form'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <FormPage />;
}