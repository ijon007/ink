import type { Metadata } from "next";

import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { File, FileText, Home } from "lucide-react"
    
export const metadata: Metadata = {
  title: "ink. | Editor",
  description: "A simple, beautiful, and powerful text editor.",
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
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList className="gap-1">
                            <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/app" className="hover:bg-neutral-200/60 transition-all duration-300 px-2 py-1 rounded-md flex items-center gap-2">
                                <Home className="size-4" />
                                <span>Home</span>
                            </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem className="hover:bg-neutral-200/60 transition-all duration-300 px-2 py-1 rounded-md cursor-pointer">
                                <FileText className="size-4" />
                                <BreadcrumbPage>My Notes</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 pt-0 overflow-y-scroll">
                {children}
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
