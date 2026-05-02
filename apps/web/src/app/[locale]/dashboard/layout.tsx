import DashboardSidebar from '@/components/dashboard/sidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 md:ml-0 ml-0 pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
