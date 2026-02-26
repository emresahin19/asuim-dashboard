import { routesById } from '@/utils';
import SelectPage from '@/views/components/form/select/Select.page';
import { Metadata } from 'next';

const route = routesById['components-form-select'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <SelectPage />;
}