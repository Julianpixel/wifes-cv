import { getSiteData } from '@/lib/data';
export const dynamic = 'force-dynamic';
import AppearancePage from './AppearancePage';

export default async function Page() {
  const data = await getSiteData();
  return <AppearancePage initialData={data} />;
}
