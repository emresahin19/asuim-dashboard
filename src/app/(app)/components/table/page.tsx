import { routesById } from '@/utils';
import TablePage from '@/views/components/table/Table.page';
import { Metadata } from 'next';

const route = routesById['table'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <TablePage />;
}