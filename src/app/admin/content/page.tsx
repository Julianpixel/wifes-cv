import { getSiteData } from '@/lib/data';
export const dynamic = 'force-dynamic';
import ContentPage from './ContentPage';

export default async function Page() {
  const data = await getSiteData();
  return <ContentPage initialData={data} />;
}
