'use client';

import {
  Command,
  Frame,
  PieChart,
  Map,
} from 'lucide-react';
import Link from 'next/link';
import type * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NotesSection } from './notes-section';
import { NavUser } from './nav-user';
import { PublishedNotes } from './published-notes';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  publishedNotes: [
    
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} className="bg-neutral-100">
      <SidebarHeader className="bg-neutral-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/app">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">ink.</span>
                  <span className="truncate text-xs">Editor</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-neutral-100">
        <NotesSection />
        <PublishedNotes projects={data.publishedNotes} />
      </SidebarContent>
      <SidebarFooter className='bg-neutral-100'>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
