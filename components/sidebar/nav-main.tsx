'use client';

import { Plus, FileText, EllipsisVertical } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from '@/components/ui/sidebar';
import { useNotesStore, type Note } from '@/lib/stores/notes-store';
import { useState } from 'react';
import NoteActions from './note-actions';
import { cn, getIconColorClasses } from '@/lib/utils';

export function NavMain() {
  const router = useRouter();
  const { notes, addNote, deleteNote, starNote } = useNotesStore();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNote = () => {
    setIsCreating(true);
    const newNote = addNote('Untitled Note');
    router.push(`/app/${newNote.id}`);
    setIsCreating(false);
  };

  const handleStar = (noteId: string) => {
    starNote(noteId);
  };

  const handleDelete = (noteId: string) => {
    deleteNote(noteId);
    // If we're currently on the deleted note, redirect to the first available note
    const remainingNotes = notes.filter(note => note.id !== noteId);
    if (remainingNotes.length > 0) {
      router.push(`/app/${remainingNotes[0].id}`);
    } else {
      // If no notes left, redirect to home or create a new note
      router.push('/app');
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex w-full items-center justify-between px-1">
        <span>Notes</span>
        <Button
          className="size-6 rounded-md transition-all duration-300 hover:bg-neutral-200/50"
          size="icon"
          variant="ghost"
          onClick={handleCreateNote}
          disabled={isCreating}
        >
          <Plus className="size-4" />
        </Button>
      </SidebarGroupLabel>
      
      <SidebarMenu>
        {notes.map((note: Note) => (
          <SidebarMenuItem key={note.id} className='group'>
            <SidebarMenuButton
              asChild
              className="rounded-md transition-all duration-300 hover:bg-neutral-200/50"
              tooltip={note.title}
            >
              <Link href={`/app/${note.id}`} className='flex flex-row items-center justify-between'>
                <div className="flex items-center gap-2">
                  {(() => {
                    const IconComp = (LucideIcons as Record<string, any>)[note.icon] || FileText;
                    return <IconComp className={cn("size-4", getIconColorClasses(note.iconColor))} />;
                  })()}
                  <span className="truncate">{note.title}</span>
                </div>
                <NoteActions
                    noteId={note.id}
                    isStarred={note.isStarred}
                    onStar={handleStar}
                    onDelete={handleDelete}
                />
              </Link>
              
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
