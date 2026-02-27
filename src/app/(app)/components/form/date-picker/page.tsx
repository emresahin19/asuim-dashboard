import { routesById } from '@/utils';
import DatePickerPage from '@/views/components/form/date-picker/DatePicker.page';
import { Metadata } from 'next';

const route = routesById['components-form-date-picker'];

export function generateMetadata(): Metadata {
  return {
    title: route.title,
    description: route.description,
  };
}

export default function Page() {
  return <DatePickerPage />;
}