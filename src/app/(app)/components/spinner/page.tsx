import { routesById } from '@/utils';
import SpinnerPage from '@/views/components/spinner/Spinner.page';
import { Metadata } from 'next';

const route = routesById['components-spinner'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <SpinnerPage />;
}
