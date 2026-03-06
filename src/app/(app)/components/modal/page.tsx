import { routesById } from '@/utils';
import ModalPage from '@/views/components/modal/Modal.page';
import { Metadata } from 'next';

const route = routesById['components-modal'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <ModalPage />;
}
