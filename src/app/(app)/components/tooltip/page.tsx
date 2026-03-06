import { routesById } from '@/utils';
import TooltipPage from '@/views/components/tooltip/Tooltip.page';
import { Metadata } from 'next';

const route = routesById['components-tooltip'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <TooltipPage />;
}
