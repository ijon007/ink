'use client';

import { Plus, FileText } from "lucide-react";
import { useNotesStore } from '@/lib/stores/notes-store';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NoteCard from '@/components/notes/note-card';

function EditorHomePage() {
  const { notes, addNote, deleteNote, starNote } = useNotesStore();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNote = () => {
    setIsCreating(true);
    const newNote = addNote('Untitled Note');
    router.push(`/app/${newNote.id}`);
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
    }
  };

  const handleStarNote = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    starNote(id);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to ink.</h1>
            <p className="text-xl text-gray-600">Your AI-powered writing companion</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Notes</h2>
            {notes.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No notes yet. Create your first note to get started!</p>
                <Button onClick={handleCreateNote} disabled={isCreating}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Note
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    handleStarNote={handleStarNote}
                    handleDeleteNote={handleDeleteNote}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorHomePage;
