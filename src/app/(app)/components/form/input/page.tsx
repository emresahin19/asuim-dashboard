import { routesById } from '@/constant/route-registry.config';
import InputsPage from '@/views/components/form/inputs/Inputs.page';
import { Metadata } from 'next';

const route = routesById['components-form-input'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <InputsPage />;
}