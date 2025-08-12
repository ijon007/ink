'use client';

import React from 'react';
import { MoreHorizontal, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuAction } from '../ui/sidebar';

interface NoteActionsProps {
  noteId: string;
  isStarred?: boolean;
  onStar?: (noteId: string) => void;
  onDelete?: (noteId: string) => void;
}

const NoteActions: React.FC<NoteActionsProps> = ({
  noteId,
  isStarred = false,
  onStar,
  onDelete,
}) => {
  const handleStar = () => {
    onStar?.(noteId);
  };

  const handleDelete = () => {
    onDelete?.(noteId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction
          showOnHover
          className="h-5 w-5 p-0 hover:bg-transparent"
        >
          <MoreHorizontal className="h-3 w-3" />
          <span className="sr-only">Note actions</span>
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right" className="w-28">
        <DropdownMenuItem onClick={handleStar} className="py-1 cursor-pointer">
          <Star className="h-3 w-3" />
          {isStarred ? 'Unstar' : 'Star'}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleDelete}
          variant="destructive"
          className="py-1 cursor-pointer"
        >
          <Trash2 className="h-3 w-3" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NoteActions;