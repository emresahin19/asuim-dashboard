import { routesById } from '@/utils';
import RangePage from '@/views/components/form/range/Range.page';
import { Metadata } from 'next';

const route = routesById['components-form-range'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <RangePage />;
}