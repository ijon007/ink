'use client';

import * as LucideIcons from 'lucide-react';
import { Folder, MoreHorizontal, Share, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useNotesStore } from '@/lib/stores/notes-store';

export function PublishedNotes() {
  const { isMobile } = useSidebar();
  const { notes } = useNotesStore();

  const publishedNotes = notes.filter((n) => n.isPublished && n.publishedUrl);

  if (publishedNotes.length === 0) {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Published</SidebarGroupLabel>
        <SidebarMenu className='px-2'>
          <SidebarMenuItem className='text-muted-foreground text-xs'>
            Nothing here yet
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Published</SidebarGroupLabel>
      <SidebarMenu>
        {publishedNotes.map((item) => {
          const IconComp = (LucideIcons as Record<string, any>)[item.icon] || Folder;
          return (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                className="rounded-md transition-all duration-300 hover:bg-neutral-200/50"
              >
                <a href={item.publishedUrl!} className="flex w-full items-center gap-2">
                  <IconComp className="size-4" />
                  <span className="truncate">{item.title}</span>
                  <span className="ml-auto h-2 w-2 rounded-full bg-green-500" aria-label="Published" />
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
