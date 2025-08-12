import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isStarred: boolean;
  icon: string;
  iconColor: string;
}

interface NotesStore {
  notes: Note[];
  addNote: (title: string) => Note;
  updateNote: (id: string, updates: Partial<Omit<Note, 'createdAt' | 'updatedAt'>>) => void;
  deleteNote: (id: string) => void;
  starNote: (id: string) => void;
  getNoteById: (id: string) => Note | undefined;
  migrateNotes: () => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: [],
      
      addNote: (title: string) => {
        const newNote: Note = {
          id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: title || 'Untitled Note',
          content: 'Start writing your note here...',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isStarred: false,
          icon: 'FileText',
          iconColor: 'gray',
        };
        
        set((state) => ({
          notes: [newNote, ...state.notes]
        }));
        
        return newNote;
      },
      
      updateNote: (id: string, updates: Partial<Omit<Note, 'createdAt' | 'updatedAt'>>) => {
        set((state) => ({
          notes: state.notes.map(note => 
            note.id === id 
              ? { ...note, ...updates, updatedAt: new Date().toISOString() }
              : note
          )
        }));
      },

      // Migration function to add iconColor to existing notes
      migrateNotes: () => {
        set((state) => ({
          notes: state.notes.map(note => 
            note.iconColor ? note : { ...note, iconColor: 'gray' }
          )
        }));
      },
      
      deleteNote: (id: string) => {
        set((state) => ({
          notes: state.notes.filter(note => note.id !== id)
        }));
      },
      
      starNote: (id: string) => {
        set((state) => ({
          notes: state.notes.map(note => 
            note.id === id 
              ? { ...note, isStarred: !note.isStarred, updatedAt: new Date().toISOString() }
              : note
          )
        }));
      },
      
      getNoteById: (id: string) => {
        return get().notes.find(note => note.id === id);
      },
    }),
    {
      name: 'notes-storage',
    }
  )
);
