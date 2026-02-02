import { routesById } from '@/constant/route-registry.config';
import TokensPage from '@/views/foundations/tokens/Tokens.page';
import { Metadata } from 'next';

const route = routesById['tokens'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <TokensPage />;
}