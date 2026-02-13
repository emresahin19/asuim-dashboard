import { routesById } from '@/utils';
import TypographySystemPage from '@/views/typography/system/TypographySystem.page';
import { Metadata } from 'next';

const route = routesById['type-system'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <TypographySystemPage />;
}