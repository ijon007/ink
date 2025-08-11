import { File, FileText, Home } from 'lucide-react';
import type { Metadata } from 'next';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'ink. | Editor',
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
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              className="mr-2 data-[orientation=vertical]:h-4"
              orientation="vertical"
            />
            <Breadcrumb>
              <BreadcrumbList className="gap-1">
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    className="flex items-center gap-2 rounded-md px-2 py-1 transition-all duration-300 hover:bg-neutral-200/60"
                    href="/app"
                  >
                    <Home className="size-4" />
                    <span>Home</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="cursor-pointer rounded-md px-2 py-1 transition-all duration-300 hover:bg-neutral-200/60">
                  <FileText className="size-4" />
                  <BreadcrumbPage>My Notes</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 overflow-y-scroll pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
