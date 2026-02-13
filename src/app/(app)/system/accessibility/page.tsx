import { routesById } from '@/config';
import AccessibilityPage from '@/views/system/accessibility/Accessibility.page';
import { Metadata } from 'next';

const route = routesById['accessibility'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <AccessibilityPage />;
}