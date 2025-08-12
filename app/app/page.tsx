'use client';

import { Plus, FileText, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useNotesStore } from '@/lib/stores/notes-store';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
              <div className="grid gap-4">
                {notes.map((note) => (
                  <Link 
                    key={note.id} 
                    href={`/app/${note.id}`}
                    className="group block"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all group-hover:border-blue-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                          <div>
                            <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                              {note.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {note.content ? `${note.content.substring(0, 100)}...` : 'No content yet'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleStarNote(note.id, e)}
                            className={`${note.isStarred ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
                          >
                            <Star className={`h-4 w-4 ${note.isStarred ? 'fill-current' : ''}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleDeleteNote(note.id, e)}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                        <span>Created: {note.createdAt.toLocaleDateString()}</span>
                        <span>Updated: {note.updatedAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
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
