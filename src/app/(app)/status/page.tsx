import { routesById } from '@/utils';
import StatusPage from '@/views/status/Status.page';
import { Metadata } from 'next';

const route = routesById['status'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <StatusPage />;
}