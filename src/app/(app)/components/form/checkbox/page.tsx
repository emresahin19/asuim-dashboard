import { routesById } from '@/utils';
import CheckboxPage from '@/views/components/form/checkbox/Checkbox.page';
import { Metadata } from 'next';

const route = routesById['components-form-checkbox'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <CheckboxPage />;
}