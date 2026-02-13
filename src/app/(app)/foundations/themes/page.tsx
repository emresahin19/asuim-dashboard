import { routesById } from '@/utils';
import ThemesPage from '@/views/foundations/themes/Themes.page';
import { Metadata } from 'next';

const route = routesById['themes'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <ThemesPage />;
}