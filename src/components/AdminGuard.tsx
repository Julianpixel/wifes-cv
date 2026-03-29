'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  React.useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth !== 'true' && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router, pathname]);

  if (!isAuthorized && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
