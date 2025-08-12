import type { Metadata } from 'next';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import PageBreadcrumb from '@/components/sidebar/page-breadcrumb';

export const metadata: Metadata = {
  title: 'ink. | Notebook',
  description: 'A simple, beautiful, and powerful text editor.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="border-border">
        <PageBreadcrumb />
        <div className="flex flex-1 flex-col gap-4 overflow-y-scroll pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
