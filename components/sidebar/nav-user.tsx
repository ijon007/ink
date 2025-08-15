'use client';

import { ChevronUp, Settings} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import InviteDialog from './settings/invite-dialog';
import NewNotebookDialog from './settings/new-notebook-dialog';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="cursor-pointer transition-all duration-300 hover:bg-neutral-200 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus:ring-0">
              <Avatar className="h-6 w-6 rounded-lg">
                <AvatarImage alt={user.name} src={user.avatar} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user.name}&apos;s ink.
                </span>
              </div>
              <ChevronUp className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[300px] rounded-lg"
            side={isMobile ? 'bottom' : 'top'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage alt={user.name} src={user.avatar} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup className='flex flex-row items-center justify-start gap-2'>
              <DropdownMenuItem className="cursor-pointer transition-all duration-300 border h-7 border-neutral-200">
                <Settings />
                Settings
              </DropdownMenuItem>
              <InviteDialog />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <p className="text-xs text-muted-foreground font-medium px-1 mb-1">kushta.joni@gmail.com</p>
              <DropdownMenuItem className="cursor-pointer transition-all duration-300">
                <div className="flex flex-row items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage alt={user.name} src={user.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-black">ijon&apos;s notebook</p>
                </div>
              </DropdownMenuItem>
              <NewNotebookDialog />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer transition-all duration-300">
              <span className="font-semibold text-muted-foreground">Add a new account</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer transition-all duration-300 text-red-500 hover:text-red-500">
              <span className="text-red-500 font-semibold">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
