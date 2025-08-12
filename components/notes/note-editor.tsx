'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlateEditor } from "@/components/plate/plate-editor";
import { useNotesStore, type Note } from '@/lib/stores/notes-store';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoteEditorProps {
  noteId: string;
}

export function NoteEditor({ noteId }: NoteEditorProps) {
  const router = useRouter();
  const { getNoteById } = useNotesStore();
  
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    if (noteId) {
      const foundNote = getNoteById(noteId);
      if (foundNote) {
        setNote(foundNote);
      }
    }
  }, [noteId, getNoteById]);

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">Note not found</h1>
        <Button onClick={() => router.push('/app')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <PlateEditor note={note} />
    </div>
  );
}
